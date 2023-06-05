import service from "./config.services.js";

const getProfileService = () => {
    return service.get("/profile/main")
}

const editProfileService = (updatedProfile) => {
    return service.put("/profile/edit", updatedProfile)
}

export {
    getProfileService,
    editProfileService
}