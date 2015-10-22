var objectAssign = require('object-assign');
var statusCodes = require('./statusCodes');

module.exports = {
    init: function() {
        this._state = {
            status: statusCodes.INITIAL
        };
    },
    pending: function(newState) {
        this._updateState(newState);
        this._triggerOnStatus(statusCodes.PENDING);
    },
    ready: function(newState) {
        this._updateState(newState);
        this._triggerOnStatus(statusCodes.READY);
    },
    failed: function(newState) {
        this._updateState(newState);
        this._triggerOnStatus(statusCodes.FAILED);
    },
    setStatus: function(status) {
        this._triggerOnStatus(status);
    },
    _triggerOnStatus: function(status) {
        this._state.status = status;
        this.trigger(this._state);
    },
    _updateState: function(newState) {
        if (newState) {
            objectAssign(this._state, newState);
        }
    },
    resetToInitialStatus: function() {
        this._state.status = statusCodes.INITIAL;
    },
    statusCodes: statusCodes
};