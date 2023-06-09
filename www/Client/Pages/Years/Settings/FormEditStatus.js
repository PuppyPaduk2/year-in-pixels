define([
   'Core/Form',
   'jade!Pages/Years/Settings/FormEditStatus/Template',
   'Pages/Years/Data/Status.Model',
   'css!Pages/Years/Settings/FormEditStatus/Style'
], function(Form, template, Status) {
   'use strict';

   return Form.extend({
      className: 'form-edit-status',
      template: template,

      selectors: {
         'marker': '.marker-day'
      },

      events: {
         'click .button[data-name="close"]': 'close',
         'click .button[data-name="save"]': 'save',
         'click marker': 'showPalette'
      },

      /**
       * Конфигарация дочерних представлений
       * @config {Object}
       */
      _childs: {
         palette: {
            include: ['Views/List', 'Views/FloatArea'],
            callback: function(List, FloatArea) {
               var listPalette = new List({
                  className: 'palette',
                  classNameItem: 'marker-day',
                  items: [
                     '#F44336', '#E91E63', '#9C27B0', '#673AB7',
                     '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
                     '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
                     '#FFEB3B', '#FFC107', '#FF5722', '#212121'
                  ].map(function(color) {
                     return {
                        attrs: {
                           'data-color': color,
                           'style': Status.prototype.styleMarker(color, true)
                        }
                     };
                  })
               });

               var palette = new FloatArea({
                  area: listPalette,
                  offset: {
                     top: -7,
                     left: -6
                  }
               });

               // Подпишимся на события самой палетки и всплывашки
               this.listenTo(listPalette, 'clickItem', function(data) {
                  var $marker = this.$element('marker');

                  // Поменяем стиль маркера
                  $marker.attr({
                     'style': Status.prototype.styleMarker(data.color, true)
                  });
                  $marker.val(data.color);
               });

               return palette;
            }
         }
      },

      /**
       * Показать палитру
       */
      showPalette: function(e) {
         this.child('palette', function(palette) {
            palette.show($(e.target));
         }, []);
      }
   });
});