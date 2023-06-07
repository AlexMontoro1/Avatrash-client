import service from "./config.services.js";

const getProfileService = () => {
    return service.get("/profile/main")
}

const editProfileService = (updatedProfile) => {
    return service.put("/profile/edit", updatedProfile)
}

const uploadImage = (formData) => {
    return service.put("/profile/main", formData);
  };

export {
    getProfileService,
    editProfileService,
    uploadImage
}