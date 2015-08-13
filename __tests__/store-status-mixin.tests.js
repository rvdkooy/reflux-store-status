var StoreStatusMixin = require('../index');
var Reflux = require('reflux');

describe("Reflux store status mixin tests:", function() {
    
    var triggeredState = null, unsubscribe;

    describe("when creating a store with the mixin", function() {
        var store = Reflux.createStore({
            mixins: [StoreStatusMixin]
        });

        it("it should contain all the store status codes", function() {
            expect(store.statusCodes).toBeDefined();
            expect(store.statusCodes.INITIAL).toBe("INITIAL");
            expect(store.statusCodes.PENDING).toBe("PENDING");
            expect(store.statusCodes.FAILED).toBe("FAILED");
            expect(store.statusCodes.READY).toBe("READY");
        });

        it("it's initial status should be INITIAL", function() {
            expect(store._state.status).toBe(store.statusCodes.INITIAL);            
        });
    });

    describe("when calling the pending function", function() {
        var store = Reflux.createStore({
            mixins: [StoreStatusMixin],
            goIntoPendingStatusPlease: function () {
                this.pending();
            }
        });
        
        beforeEach(function (done) {
            
            unsubscribe = store.listen(function(state) {
                triggeredState = state;
                done();
            });

            store.goIntoPendingStatusPlease();
        });

        it("it should put the store into the pending state", function() {
            expect(store._state.status).toBe(store.statusCodes.PENDING);
            
        });

        it("it should trigger the new state", function() {
            expect(triggeredState.status).toBe(store.statusCodes.PENDING);            
        });
    });

    describe("when calling the ready function", function() {
        var store = Reflux.createStore({
            mixins: [StoreStatusMixin],
            goIntoReadyStatusPlease: function () {
                this.ready();
            }
        });

        beforeEach(function (done) {
            
            unsubscribe = store.listen(function(state) {
                triggeredState = state;
                done();
            });
            
            store.goIntoReadyStatusPlease();
        });

        it("it should put the store into the ready state", function() {
            expect(store._state.status).toBe(store.statusCodes.READY);
        });

        it("it should trigger the new state", function() {
            expect(triggeredState.status).toBe(store.statusCodes.READY);            
        });
    });

    describe("when calling the failed function", function() {
        var store = Reflux.createStore({
            mixins: [StoreStatusMixin],
            goIntoFailedStatusPlease: function () {
                this.failed();
            }
        });

        beforeEach(function (done) {
            
            unsubscribe = store.listen(function(state) {
                triggeredState = state;
                done();
            });
            
            store.goIntoFailedStatusPlease();
        });

        it("it should put the store into the failed state", function() {
            expect(store._state.status).toBe(store.statusCodes.FAILED);
            
        });

        it("it should trigger the new state", function() {
            expect(triggeredState.status).toBe(store.statusCodes.FAILED);            
        });
    });

    describe("when calling the setStatus function", function() {
        var store = Reflux.createStore({
            mixins: [StoreStatusMixin],
            goIntoStatusPlease: function () {
                this.setStatus(this.statusCodes.PENDING);
            }
        });

        beforeEach(function (done) {
            
            unsubscribe = store.listen(function(state) {
                triggeredState = state;
                done();
            });
            
            store.goIntoStatusPlease();
        });

        it("it should put the store status into that status", function() {
            expect(store._state.status).toBe(store.statusCodes.PENDING);
            
        });

        it("it should trigger the new state", function() {
            expect(triggeredState.status).toBe(store.statusCodes.PENDING);            
        });
    });

    describe("when resetting the status", function() {
        var store = Reflux.createStore({
            mixins: [StoreStatusMixin],
            goIntoReadyStatusPlease: function () {
                this.ready();
            }
        });

        it("it should put the store status into the initial state", function() {
            
            store.goIntoReadyStatusPlease();
            store.resetToInitialStatus();

            expect(store._state.status).toBe(store.statusCodes.INITIAL);
        });
    });

    beforeEach(function() {
        triggeredState = null;
    });

    afterEach(function() {
        if(unsubscribe) unsubscribe();
    });
});