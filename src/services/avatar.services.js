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

  export { 
    createAvatarService,
    getAvatarDetailsService,
    editAvatarService,
    deleteAvatarService
   };