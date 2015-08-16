var StoreStatusMixin = require('../index');
var Reflux = require('reflux');

describe("Reflux store status mixin tests:", function() {
    
    var triggeredChange = null, unsubscribe;

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
            goIntoPendingStatusPlease: function(data) {
                this.pending(data);
            }
        });
        
        beforeEach(function(done) {
            
            unsubscribe = store.listen(function(change) {
                triggeredChange = change;
                done();
            });

            store.goIntoPendingStatusPlease({ foo: "bar" });
        });

        it("it should put the store into the pending state", function() {
            expect(store._state.status).toBe(store.statusCodes.PENDING);
            
        });

        it("it should trigger the new state", function() {
            expect(triggeredChange.foo).toBe("bar");   
            expect(triggeredChange.status).toBe(store.statusCodes.PENDING);            
        });
    });

    describe("when calling the ready function", function() {
        var store = Reflux.createStore({
            mixins: [StoreStatusMixin],
            goIntoReadyStatusPlease: function(newState) {
                this.ready(newState);
            }
        });

        beforeEach(function(done) {
            
            unsubscribe = store.listen(function(state) {
                triggeredChange = state;
                done();
            });
            
            store.goIntoReadyStatusPlease({ foo: "bar" });
        });

        it("it should put the store into the ready state", function() {
            expect(store._state.status).toBe(store.statusCodes.READY);
        });

        it("it should trigger the new state", function() {
            expect(triggeredChange.foo).toBe("bar");   
            expect(triggeredChange.status).toBe(store.statusCodes.READY);            
        });
    });

    describe("when calling the failed function", function() {
        var store = Reflux.createStore({
            mixins: [StoreStatusMixin],
            goIntoFailedStatusPlease: function(newState) {
                this.failed(newState);
            }
        });

        beforeEach(function(done) {
            
            unsubscribe = store.listen(function(state) {
                triggeredChange = state;
                done();
            });
            
            store.goIntoFailedStatusPlease({ foo: "bar" });
        });

        it("it should put the store into the failed state", function() {
            expect(store._state.status).toBe(store.statusCodes.FAILED);
            
        });

        it("it should trigger the new state", function() {
            expect(triggeredChange.foo).toBe("bar");   
            expect(triggeredChange.status).toBe(store.statusCodes.FAILED);            
        });
    });

    describe("when calling the setStatus function", function() {
        var store = Reflux.createStore({
            mixins: [StoreStatusMixin],
            goIntoStatusPlease: function() {
                this.setStatus(this.statusCodes.PENDING);
            }
        });

        beforeEach(function(done) {
            
            unsubscribe = store.listen(function(state) {
                triggeredChange = state;
                done();
            });
            
            store.goIntoStatusPlease();
        });

        it("it should put the store status into that status", function() {
            expect(store._state.status).toBe(store.statusCodes.PENDING);
            
        });

        it("it should trigger the new state", function() {
            expect(triggeredChange.status).toBe(store.statusCodes.PENDING);            
        });
    });

    describe("when resetting the status", function() {
        var store = Reflux.createStore({
            mixins: [StoreStatusMixin],
            goIntoReadyStatusPlease: function() {
                this.ready();
            }
        });

        it("it should put the store status into the initial state", function() {
            
            store.goIntoReadyStatusPlease();
            store.resetToInitialStatus();

            expect(store._state.status).toBe(store.statusCodes.INITIAL);
        });
    });

    describe("When not passing any new state", function() {

        it("it should ignore that state", function(done) {
            var store = Reflux.createStore({
                mixins: [StoreStatusMixin],
                init: function() {
                    this._state.foo = "bar";
                },
                goIntoReadyStatusPlease: function(newState) {
                    this.ready(newState);
                }
            });
            unsubscribe = store.listen(function(state) {
                expect(state.status).toBe(store.statusCodes.READY);
                expect(state.foo).toBe("bar");
                done();
            });
            
            store.goIntoReadyStatusPlease();
        });
    });

    describe("When passing partial new state", function() {

        it("it should only update that partial new state", function(done) {
            var store = Reflux.createStore({
                mixins: [StoreStatusMixin],
                init: function() {
                    this._state.fooOne = "bar1";
                    this._state.fooTwo = "bar2";
                },
                goIntoReadyStatusPlease: function(newState) {
                    this.ready(newState);
                }
            });
            unsubscribe = store.listen(function(state) {
                expect(state.status).toBe(store.statusCodes.READY);
                expect(state.fooOne).toBe("bar1");
                expect(state.fooTwo).toBe("barrr2");
                done();
            });
            
            store.goIntoReadyStatusPlease({ fooTwo:"barrr2" });
        });
    });

    beforeEach(function() {
        triggeredChange = null;
    });

    afterEach(function() {
        if(unsubscribe) unsubscribe();
    });
});