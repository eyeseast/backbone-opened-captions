
// Models

/***
A transcript stores text we pull in from OpenedCaptions.

**Defaults**
Each of these options can be overridden in `options`.

 - socket: a `socket.io` connection using autodiscovery
 - view: a `TranscriptView` instance, attached to this model
***/

var OPENED_CAPTIONS_URL = "http://openedcaptions.com:3000";

var Transcript = Backbone.Model.extend({

    defaults: {
        body: "",
        start: new Date()
    },

    initialize: function(attributes, options) {
        _.bindAll(this);
        attributes = attributes || {};
        options = options || {};
        
        this.socket = options.socket || io.connect(OPENED_CAPTIONS_URL);
        this.socket.on('message', this.handleMessage);
        
        this.view = options.view || new TranscriptView({ model: this });
    },

    handleMessage: function(message) {
        var body = this.get('body');
        if (COMMUNICATION_TARGET_TRANSCRIPT === message.target) {
            if (COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT === message.payload.type) {
                body += message.payload.data.body;
                this.set({body: body});
            }
        }
    }
});