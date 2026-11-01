const USER_BASE= "/:username"
const HOME_BASE= `${USER_BASE}/home`

export const ROUTES = {
    login: "/",
    home: `${USER_BASE}/home`,
    profile: `${HOME_BASE}/profile`,
    account: `${HOME_BASE}/account`,
    completedTasks: `${HOME_BASE}/completed-tasks`,
}