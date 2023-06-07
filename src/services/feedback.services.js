import service from "./config.services.js";

const createFeedbackService = (newFeedback) => {
    return service.post(`/admin/feedback`, newFeedback)
  }

  const getFeedbackService = () => {
    return service.get(`/admin/feedback`)
  }

  export {
    createFeedbackService,
    getFeedbackService
  }