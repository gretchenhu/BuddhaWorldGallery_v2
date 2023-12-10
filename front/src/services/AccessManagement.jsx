// AccessManagement.jsx

// Assuming you have some way to get the current user's role, perhaps from context or a global state
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // or wherever your UserContext is defined

const AccessLevels = {
  VIEWER: 'viewer',
  MEMBER: 'member',
  ADMIN: 'admin',
};

// Utility functions to check user role
const canRead = (user) => {
  return user && [AccessLevels.VIEWER, AccessLevels.MEMBER, AccessLevels.ADMIN].includes(user.role);
};

const canCreateComment = (user) => {
  return user && [AccessLevels.MEMBER, AccessLevels.ADMIN].includes(user.role);
};

const canManageComments = (user) => {
  return user && user.role === AccessLevels.ADMIN;
};

const canManageArtifacts = (user) => {
  return user && user.role === AccessLevels.ADMIN;
};

// A custom hook that components can use to check permissions
export const useAccessControl = () => {
  const { user } = useContext(UserContext);

  return {
    isViewer: canRead(user),
    isMember: canCreateComment(user),
    isAdmin: canManageComments(user) && canManageArtifacts(user),
    canCreateComment: canCreateComment(user),
    canManageComments: canManageComments(user),
    canManageArtifacts: canManageArtifacts(user),
  };
};
