// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CipherCanvasLab is SepoliaConfig {
    using FHE for *;
    
    struct CanvasProject {
        euint32 projectId;
        euint32 ownerId;
        euint32 collaboratorCount;
        euint32 versionCount;
        bool isPublic;
        bool isActive;
        string name;
        string description;
        address owner;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct CanvasVersion {
        euint32 versionId;
        euint32 projectId;
        euint32 layerCount;
        euint32 elementCount;
        bool isEncrypted;
        string metadataHash;
        address creator;
        uint256 timestamp;
    }
    
    struct CanvasLayer {
        euint32 layerId;
        euint32 versionId;
        euint32 elementCount;
        euint8 opacity;
        bool isVisible;
        bool isLocked;
        string layerName;
        address creator;
        uint256 timestamp;
    }
    
    struct CanvasElement {
        euint32 elementId;
        euint32 layerId;
        euint32 x;
        euint32 y;
        euint32 width;
        euint32 height;
        euint8 elementType;
        bool isEncrypted;
        string dataHash;
        address creator;
        uint256 timestamp;
    }
    
    struct Collaboration {
        euint32 collaborationId;
        euint32 projectId;
        euint32 permissionLevel;
        bool isActive;
        address collaborator;
        uint256 joinedAt;
    }
    
    mapping(uint256 => CanvasProject) public projects;
    mapping(uint256 => CanvasVersion) public versions;
    mapping(uint256 => CanvasLayer) public layers;
    mapping(uint256 => CanvasElement) public elements;
    mapping(uint256 => Collaboration) public collaborations;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public userProjectCount;
    
    uint256 public projectCounter;
    uint256 public versionCounter;
    uint256 public layerCounter;
    uint256 public elementCounter;
    uint256 public collaborationCounter;
    
    address public owner;
    address public verifier;
    
    event ProjectCreated(uint256 indexed projectId, address indexed owner, string name);
    event VersionCreated(uint256 indexed versionId, uint256 indexed projectId, address indexed creator);
    event LayerCreated(uint256 indexed layerId, uint256 indexed versionId, address indexed creator);
    event ElementCreated(uint256 indexed elementId, uint256 indexed layerId, address indexed creator);
    event CollaborationAdded(uint256 indexed collaborationId, uint256 indexed projectId, address indexed collaborator);
    event ProjectShared(uint256 indexed projectId, address indexed from, address indexed to);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createProject(
        string memory _name,
        string memory _description,
        bool _isPublic
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Project name cannot be empty");
        
        uint256 projectId = projectCounter++;
        
        projects[projectId] = CanvasProject({
            projectId: FHE.asEuint32(0), // Will be set properly later
            ownerId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            collaboratorCount: FHE.asEuint32(0),
            versionCount: FHE.asEuint32(0),
            isPublic: _isPublic,
            isActive: true,
            name: _name,
            description: _description,
            owner: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        // Update user project count
        userProjectCount[msg.sender] = FHE.add(userProjectCount[msg.sender], FHE.asEuint32(1));
        
        emit ProjectCreated(projectId, msg.sender, _name);
        return projectId;
    }
    
    function createVersion(
        uint256 projectId,
        string memory metadataHash,
        bool isEncrypted
    ) public returns (uint256) {
        require(projects[projectId].owner == msg.sender || 
                _isCollaborator(projectId, msg.sender), "Not authorized to create version");
        require(projects[projectId].isActive, "Project is not active");
        
        uint256 versionId = versionCounter++;
        
        versions[versionId] = CanvasVersion({
            versionId: FHE.asEuint32(0), // Will be set properly later
            projectId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            layerCount: FHE.asEuint32(0),
            elementCount: FHE.asEuint32(0),
            isEncrypted: isEncrypted,
            metadataHash: metadataHash,
            creator: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update project version count
        projects[projectId].versionCount = FHE.add(projects[projectId].versionCount, FHE.asEuint32(1));
        projects[projectId].updatedAt = block.timestamp;
        
        emit VersionCreated(versionId, projectId, msg.sender);
        return versionId;
    }
    
    function createLayer(
        uint256 versionId,
        string memory layerName,
        euint8 opacity
    ) public returns (uint256) {
        require(versions[versionId].creator != address(0), "Version does not exist");
        require(versions[versionId].creator == msg.sender || 
                _isProjectCollaborator(versionId, msg.sender), "Not authorized to create layer");
        
        uint256 layerId = layerCounter++;
        
        layers[layerId] = CanvasLayer({
            layerId: FHE.asEuint32(0), // Will be set properly later
            versionId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            elementCount: FHE.asEuint32(0),
            opacity: opacity,
            isVisible: true,
            isLocked: false,
            layerName: layerName,
            creator: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update version layer count
        versions[versionId].layerCount = FHE.add(versions[versionId].layerCount, FHE.asEuint32(1));
        
        emit LayerCreated(layerId, versionId, msg.sender);
        return layerId;
    }
    
    function createElement(
        uint256 layerId,
        euint32 x,
        euint32 y,
        euint32 width,
        euint32 height,
        euint8 elementType,
        string memory dataHash,
        bool isEncrypted
    ) public returns (uint256) {
        require(layers[layerId].creator != address(0), "Layer does not exist");
        require(layers[layerId].creator == msg.sender || 
                _isLayerCollaborator(layerId, msg.sender), "Not authorized to create element");
        require(!layers[layerId].isLocked, "Layer is locked");
        
        uint256 elementId = elementCounter++;
        
        elements[elementId] = CanvasElement({
            elementId: FHE.asEuint32(0), // Will be set properly later
            layerId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            x: x,
            y: y,
            width: width,
            height: height,
            elementType: elementType,
            isEncrypted: isEncrypted,
            dataHash: dataHash,
            creator: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update layer element count
        layers[layerId].elementCount = FHE.add(layers[layerId].elementCount, FHE.asEuint32(1));
        
        // Update version element count
        uint256 versionId = _getVersionIdFromLayer(layerId);
        versions[versionId].elementCount = FHE.add(versions[versionId].elementCount, FHE.asEuint32(1));
        
        emit ElementCreated(elementId, layerId, msg.sender);
        return elementId;
    }
    
    function addCollaborator(
        uint256 projectId,
        address collaborator,
        euint32 permissionLevel
    ) public returns (uint256) {
        require(projects[projectId].owner == msg.sender, "Only project owner can add collaborators");
        require(collaborator != address(0), "Invalid collaborator address");
        require(collaborator != msg.sender, "Cannot add yourself as collaborator");
        
        uint256 collaborationId = collaborationCounter++;
        
        collaborations[collaborationId] = Collaboration({
            collaborationId: FHE.asEuint32(0), // Will be set properly later
            projectId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            permissionLevel: permissionLevel,
            isActive: true,
            collaborator: collaborator,
            joinedAt: block.timestamp
        });
        
        // Update project collaborator count
        projects[projectId].collaboratorCount = FHE.add(projects[projectId].collaboratorCount, FHE.asEuint32(1));
        
        emit CollaborationAdded(collaborationId, projectId, collaborator);
        return collaborationId;
    }
    
    function shareProject(
        uint256 projectId,
        address to
    ) public {
        require(projects[projectId].owner == msg.sender || 
                _isCollaborator(projectId, msg.sender), "Not authorized to share project");
        require(to != address(0), "Invalid recipient address");
        require(projects[projectId].isPublic, "Project is not public");
        
        emit ProjectShared(projectId, msg.sender, to);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getProjectInfo(uint256 projectId) public view returns (
        string memory name,
        string memory description,
        uint8 collaboratorCount,
        uint8 versionCount,
        bool isPublic,
        bool isActive,
        address projectOwner,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        CanvasProject storage project = projects[projectId];
        return (
            project.name,
            project.description,
            0, // FHE.decrypt(project.collaboratorCount) - will be decrypted off-chain
            0, // FHE.decrypt(project.versionCount) - will be decrypted off-chain
            project.isPublic,
            project.isActive,
            project.owner,
            project.createdAt,
            project.updatedAt
        );
    }
    
    function getVersionInfo(uint256 versionId) public view returns (
        uint8 layerCount,
        uint8 elementCount,
        bool isEncrypted,
        string memory metadataHash,
        address creator,
        uint256 timestamp
    ) {
        CanvasVersion storage version = versions[versionId];
        return (
            0, // FHE.decrypt(version.layerCount) - will be decrypted off-chain
            0, // FHE.decrypt(version.elementCount) - will be decrypted off-chain
            version.isEncrypted,
            version.metadataHash,
            version.creator,
            version.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getUserProjectCount(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userProjectCount[user]) - will be decrypted off-chain
    }
    
    // Helper functions
    function _isCollaborator(uint256 projectId, address user) internal view returns (bool) {
        // This would need to be implemented to check collaboration mappings
        // For now, returning false as a placeholder
        return false;
    }
    
    function _isProjectCollaborator(uint256 versionId, address user) internal view returns (bool) {
        // This would need to be implemented to check collaboration mappings
        // For now, returning false as a placeholder
        return false;
    }
    
    function _isLayerCollaborator(uint256 layerId, address user) internal view returns (bool) {
        // This would need to be implemented to check collaboration mappings
        // For now, returning false as a placeholder
        return false;
    }
    
    function _getVersionIdFromLayer(uint256 layerId) internal view returns (uint256) {
        // This would need to be implemented to map layer to version
        // For now, returning 0 as a placeholder
        return 0;
    }
}
