import service from "./config.services.js";

const createCommentService = (avatarId,newComment) => {
    return service.post(`/avatar/${avatarId}/comment`, newComment)
  }

  const deleteCommentService = (avatarId,commentId) => {
    return service.delete(`/avatar/${avatarId}/comment/${commentId}`)
  }

  export {
    createCommentService,
    deleteCommentService
  }