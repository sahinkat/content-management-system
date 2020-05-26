(function() {
  'use strict';

  const treeviewMenu = $('.app-menu');

  // Toggle Sidebar
  $('[data-toggle="sidebar"]').click(function(event) {
    event.preventDefault();
    $('.app').toggleClass('sidenav-toggled');
  });

  // Activate sidebar treeview toggle
  $('[data-toggle=\'treeview\']').click(function(event) {
    event.preventDefault();
    if (!$(this).parent().hasClass('is-expanded')) {
      treeviewMenu.find('[data-toggle=\'treeview\']').parent().removeClass('is-expanded');
    }
    $(this).parent().toggleClass('is-expanded');
  });

  // Set initial active toggle
  $('[data-toggle=\'treeview.\'].is-expanded').parent().toggleClass('is-expanded');

  // Activate bootstrip tooltips
  $('[data-toggle=\'tooltip\']').tooltip();
})();

$.fn.extend({
  treed: function(o) {
    let openedClass = 'fa fa-minus-circle';
    let closedClass = 'fa fa-plus-circle';

    if (typeof o != 'undefined') {
      if (typeof o.openedClass != 'undefined') {
        openedClass = o.openedClass;
      }
      if (typeof o.closedClass != 'undefined') {
        closedClass = o.closedClass;
      }
    };

    // initialize each of the top levels
    const tree = $(this);
    tree.addClass('tree');
    tree.find('li').has('ul').each(function() {
      const branch = $(this); // li with children ul
      branch.prepend('<i class=\'indicator ' + closedClass + '\'></i>');
      branch.addClass('branch');
      branch.on('click', function(e) {
        if (this == e.target) {
          const icon = $(this).children('i:first');
          icon.toggleClass(openedClass + ' ' + closedClass);
          $(this).children().children().toggle();
        }
      });
      branch.children().children().toggle();
    });
    // fire event from the dynamically added icon
    tree.find('.branch .indicator').each(function() {
      $(this).on('click', function() {
        $(this).closest('li').click();
      });
    });
    // fire event to open branch if the li contains an anchor instead of text
    tree.find('.branch>a').each(function() {
      $(this).on('click', function(e) {
        $(this).closest('li').click();
        e.preventDefault();
      });
    });
    // fire event to open branch if the li contains a button instead of text
    tree.find('.branch>button').each(function() {
      $(this).on('click', function(e) {
        $(this).closest('li').click();
        e.preventDefault();
      });
    });
  },
});
