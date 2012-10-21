// Views

/***
A basic view for handling changes to a transcript.
By default, the model's `change:body` event will
fire `TranscriptView#updateText`, which sets the value of
a textarea under `#transcript`. 

Extend this view and replace the `updateText` method to add new functionality.
***/
var TranscriptView = Backbone.View.extend({

    initialize: function(options) {
        _.bindAll(this);
        if (!options.element) {
            this.setElement('#transcript');
        }
        this.textarea = this.$('textarea');

        this.model.on('change:body', this.updateText, this);
    },

    updateText: function(model, body, e) {
        this.textarea.val(this.model.get('body').replace(/\n/g, ' '));
    }
});
