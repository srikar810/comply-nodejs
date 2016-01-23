import {
    Component,
    View,
    provide
} from "angular2/core";

import {bootstrap} from "angular2/platform/browser";

import {
    RouteConfig,
    RouterLink,
    RouterOutlet,
    Route,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    Location,
    LocationStrategy,
    HashLocationStrategy,
    Router
} from "angular2/router";

import {HTTP_PROVIDERS} from "angular2/http";

import { AuthManager } from "./authmanager";

import { CompaniesPage } from "./companies/companies";
import { ProjectsPage } from "./projects/projects";
import { TaskPage } from "./task/task";
import { UsersPage } from "./users/users";
import { TasksPage } from "./tasks/tasks";
import { AuthPage } from "./auth/auth";

@Component({
    selector: "my-app",
    templateUrl: "./app/app.html",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/companies", as: "Companies", component: CompaniesPage },
    { path: "/", as: "Projects", component: ProjectsPage },
    { path: "/task/:taskId", as: "Task", component: TaskPage },
    { path: "/users", as: "Users", component: UsersPage },
    { path: "/tasks/:projectId", as: "Tasks", component: TasksPage },
    { path: "/auth", as: "Auth", component: AuthPage }
])

class App {

    router: Router;
    location: Location;
    authManager: AuthManager;

    constructor(router: Router, location: Location, authManager: AuthManager) {
        this.router = router;
        this.location = location;
        this.authManager = authManager;
        if(!this.authManager.isAuthenticated()) {
            this.router.navigate(["Auth"]);
        }
    }

    logout() {
        this.authManager.logout();
        this.router.navigate(["Auth"]);
    }

}

bootstrap(App, [ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthManager, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
