define([
   'Core/View',
   'jade!Pages/Years/Settings/Template',
   'css!Pages/Years/Settings/Style'
], function(View, template) {
   'use strict';

   var Service;

   return View.extend({
      className: 'settings',
      template: template,
      model: new Backbone.Model(window.user),

      selectors: {
         close: '.button[data-name="close"]',
         buttonTheme: '.button[data-name="change-theme"]',
         buttonPassword: '.button[data-name="change-password"]'
      },

      eventsSelectors: {
         'click close': 'close',
         'click buttonTheme': 'showMenuTheme',
         'click buttonPassword': 'showPanelPassword'
      },

      /**
       * Скрыть / закрыть окно
       */
      close: function() {
         this.dataShow(false);
      },

      /**
       * Показать меню с темами
       */
      showMenuTheme: function() {
         this.createButtonTheme(function(menu) {
            menu.show();
         });

         if (this.buttonTheme) {
            this.buttonTheme.show();
         }
      },

      /**
       * Создать представление (Меню) для кнопки с темой
       * @param {Function} callback
       */
      createButtonTheme: function(callback) {
         if (!this.buttonTheme) {
            requirejs([
               'Views/ButtonMenu/View',
               'Core/Service'
            ], function(ButtonMenu, CoreService) {
               Service = CoreService;

               this.buttonTheme = new ButtonMenu({
                  el: this.selector('buttonTheme'),
                  menu: {
                     items: [
                        {
                           content: "White",
                           attrs: {'data-name': 'White'}
                        }, {
                           content: "Black",
                           attrs: {'data-name': 'Black'}
                        }
                     ]
                  }
               });

               // Событие клика по итему
               this.listenTo(this.buttonTheme, 'clickItem', function(data) {
                  Service.post('Auth.ChangeTheme', data, {
                     success: function(result) {
                        window.location.reload();
                     }.bind(this)
                  });
               });

               // Событие обображения
               this.listenTo(this.buttonTheme, 'show', function() {
                  if (this.buttonPassword) {
                     this.buttonPassword.hide();
                  }
               });

               if (_.isFunction(callback)) {
                  callback.call(this, this.buttonTheme);
               }
            }.bind(this));
         }
      },

      /**
       * Показать панель для редактирования пароля
       */
      showPanelPassword: function() {
         this.createPanelPassword(function(view) {
            view.show();
         });

         if (this.panelPassword) {
            this.panelPassword.show();
         }
      },

      /**
       * Создать кнопку с панелью редактирования пароля
       * @param {Function}  callback
       */
      createPanelPassword: function(callback) {
         if (!this.panelPassword) {
            requirejs([
               'Views/ButtonPanel/View',
               'Pages/Years/Settings/PanelEditPassword/View'
            ], function(ButtonPanel, PanelEditPassword) {
               var panelEditPassword = new PanelEditPassword();

               this.panelPassword = new ButtonPanel({
                  el: this.selector('buttonPassword'),
                  panel: {
                     $el: panelEditPassword.$el,
                     $border: $('body')
                  }
               });

               if (_.isFunction(callback)) {
                  callback.call(this, this.panelPassword);
               }
            }.bind(this));
         }
      }
   });
});