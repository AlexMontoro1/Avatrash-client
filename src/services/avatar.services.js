import service from "./config.services.js";

const getAvatarsService = () => {
  return service.get("/avatar")
}

const createAvatarService = (newAvatar) => {
    return service.post("/avatar/create", newAvatar)
  }
  
  const getAvatarDetailsService = (avatarId) => {
    return service.get(`/avatar/${avatarId}`)
  }
  
  const editAvatarService = (avatarId, editedAvatarData) => {
    return service.put(`/avatar/${avatarId}`, editedAvatarData)
  }
  
  const deleteAvatarService = (avatarId) => {
    return service.delete(`/avatar/${avatarId}`)
  }

  export { 
    getAvatarsService,
    createAvatarService,
    getAvatarDetailsService,
    editAvatarService,
    deleteAvatarService
   };