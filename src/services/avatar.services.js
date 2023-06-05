import service from "./config.services.js";

const createAvatarService = (newAvatar) => {
    return service.post("/avatar/create", newAvatar)
  }
  
  const getAvatarDetailsService = (avatarId) => {
    return service.get(`/avatar/${avatarId}`)
  }
  
  const editAvatarService = (avatarId) => {
    return service.put(`/avatar/${avatarId}`)
  }
  
  const deleteAvatarService = (avatarId) => {
    return service.delete(`/avatar/${avatarId}`)
  }
  
  const createCommentService = (avatarId, newComment) => {
    return service.post(`/avatar/${avatarId}/comment`, newComment)
  }

  export { 
    createAvatarService,
    getAvatarDetailsService,
    editAvatarService,
    deleteAvatarService,
    createCommentService
   };