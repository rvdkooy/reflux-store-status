[![Build Status](https://travis-ci.org/rvdkooy/reflux-store-status.svg?branch=master)](https://travis-ci.org/rvdkooy/reflux-store-status)

# reflux-store-status
A reflux store mixin that makes your store status aware.


With refluxjs you can create async actions that you typically use for API calls. During those calls you want to give the user some feedbackthat something is happening in the background.

```
// In your store:
var store = Reflux.createStore({
    mixins: [StoreStatusMixin],
    onLoadData: function() {
        this.pending(); // this puts the store status into PENDING and triggers
    },  
    onLoadDataCompleted: function(data) {
        this._state = data;
        this.ready(); // this puts the store status into READY and triggers
    }
});

// In your component:
var Component = React.createClass({
    render: function() {

        if(this.state.status === store.statusCodes.PENDING) {
            
            // show progress indicator
        } else if (this.state.status === store.statusCodes.READY) {

            // show the things from the store
        } else {
            
            // do something else
        }
    }
});

```

The store can contain the following status codes:
- INITIAL
- PENDING
- READY
- FAILED

The following Store helpers are available:
```
// to put the store into the READY status:
this.ready();

// to put the store into the PENDING status:
this.pending();

// to put the store into the FAILED status:
this.failed();

// to put the store into any or your own status:
this.setStatus(status);

// to reset the store into the INITIAL status
this.resetToInitialStatus();

```
