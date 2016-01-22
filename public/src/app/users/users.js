var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var router_1 = require("angular2/router");
var authmanager_1 = require("../authmanager");
var UsersPage = (function () {
    function UsersPage(http, router, authManager) {
        var _this = this;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.people = [];
        this.http.get("/api/user/getAll")
            .subscribe(function (success) {
            var jsonResponse = success.json();
            for (var i = 0; i < jsonResponse.length; i++) {
                _this.people.push({
                    id: jsonResponse[i]._id,
                    name: {
                        first: jsonResponse[i].name.first,
                        last: jsonResponse[i].name.last,
                    },
                    company: jsonResponse[i].company
                });
            }
        }, function (error) {
            console.error(JSON.stringify(error));
        });
        this.companies = [];
        this.http.get("/api/company/getAll")
            .subscribe(function (success) {
            var jsonResponse = success.json();
            for (var i = 0; i < jsonResponse.length; i++) {
                _this.companies.push({
                    id: jsonResponse[i]._id,
                    name: jsonResponse[i].name
                });
            }
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    }
    UsersPage.prototype.create = function (firstname, lastname, street, city, state, zip, country, phone, email, password, company) {
        var _this = this;
        var postBody = {
            name: {
                first: firstname,
                last: lastname
            },
            address: {
                street: street,
                city: city,
                state: state,
                country: country,
                zip: zip
            },
            phone: phone,
            password: password,
            email: email,
            company: company
        };
        var requestHeaders = new http_1.Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new http_1.Request({
            method: http_1.RequestMethod.Post,
            url: "/api/user/create",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
            .subscribe(function (success) {
            _this.people.push(success.json());
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    };
    UsersPage = __decorate([
        core_1.Component({
            selector: "users",
            viewProviders: [http_1.HTTP_PROVIDERS, authmanager_1.AuthManager]
        }),
        core_1.View({
            templateUrl: "app/users/users.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, authmanager_1.AuthManager])
    ], UsersPage);
    return UsersPage;
})();
exports.UsersPage = UsersPage;
