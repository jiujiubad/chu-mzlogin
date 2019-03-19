;
/* module-key = 'com.atlassian.auiplugin:aui-navigation', location = 'src/soy/navigation.soy' */
// This file was automatically generated from navigation.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.navigation.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.navigation == 'undefined') { aui.navigation = {}; }


aui.navigation.item = function(opt_data, opt_ignored) {
  return '<li class="' + ((opt_data.isSelected || opt_data.key && opt_data.selectedItemKey == opt_data.key) ? 'aui-nav-selected' : '') + aui.renderExtraClasses(opt_data) + '"' + ((opt_data.isCollapsible && opt_data.children && opt_data.children.length > 0) ? 'aria-expanded="' + ((opt_data.isCollapsed) ? 'false' : 'true') + '"' : '') + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.children && opt_data.children.length > 0 && opt_data.isCollapsible) ? '<a href="#" class="aui-nav-subtree-toggle">' + aui.icons.icon({icon: opt_data.isCollapsed ? 'collapsed' : 'expanded', size: 'small', useIconFont: true}) + '</a>' : '') + '<a class="aui-nav-item" href="' + soy.$$escapeHtml(opt_data.href) + '">' + ((opt_data.iconClass && ! opt_data.isChild) ? aui.icons.icon({icon: opt_data.iconClass, size: 'small', useIconFont: true}) : '') + ((opt_data.count == 0 || opt_data.count) ? '<aui-badge>' + soy.$$escapeHtml(opt_data.count) + '</aui-badge>' : '') + '<span class="aui-nav-item-label">' + soy.$$escapeHtml(opt_data.label) + '</span></a>' + ((opt_data.children && opt_data.children.length > 0) ? aui.navigation.nav({items: opt_data.children, selectedItemKey: opt_data.selectedItemKey, isChild: true}) : '') + '</li>';
};
if (goog.DEBUG) {
  aui.navigation.item.soyTemplateName = 'aui.navigation.item';
}


aui.navigation.nav = function(opt_data, opt_ignored) {
  var output = '<ul class="aui-nav' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>';
  var itemList58 = opt_data.items;
  var itemListLen58 = itemList58.length;
  for (var itemIndex58 = 0; itemIndex58 < itemListLen58; itemIndex58++) {
    var itemData58 = itemList58[itemIndex58];
    output += aui.navigation.item(soy.$$augmentMap(itemData58, {isChild: opt_data.isChild, selectedItemKey: opt_data.selectedItemKey}));
  }
  output += '</ul>';
  return output;
};
if (goog.DEBUG) {
  aui.navigation.nav.soyTemplateName = 'aui.navigation.nav';
}
;