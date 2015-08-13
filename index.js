var statusCodes = {
    INITIAL: "INITIAL",
    READY: "READY",
    PENDING: "PENDING",
    FAILED: "FAILED"
};

module.exports = {
    init: function () {
        this._state = {
            status: statusCodes.INITIAL
        };
    },
    pending: function () {
        this._triggerOnStatus(statusCodes.PENDING);
    },
    ready: function () {
        this._triggerOnStatus(statusCodes.READY);
    },
    failed: function () {
        this._triggerOnStatus(statusCodes.FAILED);
    },
    setStatus: function (status) {
        this._triggerOnStatus(status);
    },
    _triggerOnStatus: function(status) {
        this._state.status = status;
        this.trigger(this._state);
    },
    resetToInitialStatus: function () {
        this._state.status = statusCodes.INITIAL;
    },
    statusCodes: statusCodes
};