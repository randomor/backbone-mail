jQuery(function(){

        window.ThreadListView = Backbone.View.extend({
        tagName: "li"
        
        , className: "mail-thread"
        
        , events: {
            "click": "open"
        }

        , template: _.template($('#mail-thread-template').html())

        , render: function(){
            $(this.el).html(this.template(this.model))
            ; return this;
        }

        , open: function(){
            $(".mail-content.selected").removeClass("selected")
            ; $(".mail-thread").removeClass("selected fade")
            ; $(this.el).addClass("selected")
            ; var mails = this.model.mails
            ; $(".detail-view").html('')
            ; _.each(mails, function(m){
                var contentView = new MailContentView({model:m})
                ; $(".detail-view").append(contentView.render().el)
            })
        }
    })
    
    ; window.MailApp = Backbone.View.extend({
        el: $("#mailApp")

        , model: []
        
        , initialize: function(){
            _.each(this.model, function(thread){
                var threadListView = new ThreadListView({model: thread});
                ; $(".list-view").append(threadListView.render().el);
            })
            ; return this;
        }
        
    })

    ; window.MailContentView = Backbone.View.extend({
        tagName: "li"
        , className: "mail-content"
        , template: _.template($('#mail-content-template').html())
         , events: {
            "click": "highlight"
        }
        , render: function(){
            $(this.el).html(this.template(this.model))
            ; return this;
        }
        , highlight: function(){
            $(".mail-thread.selected").addClass("fade")
            ; $(".mail-content").removeClass("selected")
            ; $(this.el).addClass("selected")
        }
    })

    ; $.getJSON('mails.json', function(r){
            new MailApp({model: r});
        }); 


})
