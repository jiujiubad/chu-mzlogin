;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/aui.soy' */
// This file was automatically generated from aui.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.
 */

if (typeof aui == 'undefined') { var aui = {}; }


aui.renderExtraAttributes = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.extraAttributes) {
    if (Object.prototype.toString.call(opt_data.extraAttributes) === '[object Object]') {
      var attrList7 = soy.$$getMapKeys(opt_data.extraAttributes);
      var attrListLen7 = attrList7.length;
      for (var attrIndex7 = 0; attrIndex7 < attrListLen7; attrIndex7++) {
        var attrData7 = attrList7[attrIndex7];
        output += ' ' + soy.$$escapeHtml(attrData7) + '="' + soy.$$escapeHtml(opt_data.extraAttributes[attrData7]) + '"';
      }
    } else {
      output += ' ' + soy.$$filterNoAutoescape(opt_data.extraAttributes);
    }
  }
  return output;
};
if (goog.DEBUG) {
  aui.renderExtraAttributes.soyTemplateName = 'aui.renderExtraAttributes';
}


aui.renderExtraClasses = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.extraClasses) {
    if ((opt_data.extraClasses) instanceof Array) {
      var classList23 = opt_data.extraClasses;
      var classListLen23 = classList23.length;
      for (var classIndex23 = 0; classIndex23 < classListLen23; classIndex23++) {
        var classData23 = classList23[classIndex23];
        output += ' ' + soy.$$escapeHtml(classData23);
      }
    } else {
      output += ' ' + soy.$$escapeHtml(opt_data.extraClasses);
    }
  }
  return output;
};
if (goog.DEBUG) {
  aui.renderExtraClasses.soyTemplateName = 'aui.renderExtraClasses';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/badges.soy' */
// This file was automatically generated from badges.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.badges.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.badges == 'undefined') { aui.badges = {}; }


aui.badges.badge = function(opt_data, opt_ignored) {
  return '<aui-badge' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$escapeHtml(opt_data.text) + '</aui-badge>';
};
if (goog.DEBUG) {
  aui.badges.badge.soyTemplateName = 'aui.badges.badge';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/buttons.soy' */
// This file was automatically generated from buttons.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.buttons.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.buttons == 'undefined') { aui.buttons = {}; }


aui.buttons.button = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.href || opt_data.href == '') {
    output += '<a href="' + soy.$$escapeHtml(opt_data.href) + '"' + aui.buttons.buttonAttributes(soy.$$augmentMap(opt_data, {tagName: 'a'})) + '>' + aui.buttons.buttonIcon(opt_data) + ((opt_data.hasLabel) ? '<span class="aui-button-label">' : '') + soy.$$escapeHtml(opt_data.text) + ((opt_data.hasLabel) ? '</span>' : '') + '</a>';
  } else if (opt_data.tagName == 'input') {
    output += '<input type="' + soy.$$escapeHtml(opt_data.inputType ? opt_data.inputType : 'button') + '" ' + aui.buttons.buttonAttributes(opt_data) + ' value="' + soy.$$escapeHtml(opt_data.text) + '" />';
  } else {
    var theTagName__soy29 = opt_data.tagName ? opt_data.tagName : 'button';
    output += '<' + soy.$$escapeHtml(theTagName__soy29) + aui.buttons.buttonAttributes(soy.$$augmentMap(opt_data, {tagName: theTagName__soy29})) + '>' + aui.buttons.buttonIcon(opt_data) + ((opt_data.hasLabel) ? '<span class="aui-button-label">' : '') + soy.$$escapeHtml(opt_data.text) + ((opt_data.hasLabel) ? '</span>' : '') + '</' + soy.$$escapeHtml(theTagName__soy29) + '>';
  }
  return output;
};
if (goog.DEBUG) {
  aui.buttons.button.soyTemplateName = 'aui.buttons.button';
}


aui.buttons.buttons = function(opt_data, opt_ignored) {
  return '<div' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-buttons' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</div>';
};
if (goog.DEBUG) {
  aui.buttons.buttons.soyTemplateName = 'aui.buttons.buttons';
}


aui.buttons.buttonAttributes = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-button' + ((opt_data.splitButtonType == 'main') ? ' aui-button-split-main' : '') + ((opt_data.dropdown2Target) ? ' aui-dropdown2-trigger' + ((opt_data.splitButtonType == 'more') ? ' aui-button-split-more' : '') : '');
  switch (opt_data.type) {
    case 'primary':
      output += ' aui-button-primary';
      break;
    case 'link':
      output += ' aui-button-link';
      break;
    case 'subtle':
      output += ' aui-button-subtle';
      break;
    case 'text':
      output += ' aui-button-text';
      break;
  }
  output += aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + ((opt_data.isPressed) ? ' aria-pressed="' + soy.$$escapeHtml(opt_data.isPressed) + '"' : '') + ((opt_data.isDisabled) ? ' aria-disabled="' + soy.$$escapeHtml(opt_data.isDisabled) + '"' + ((opt_data.isDisabled == true) ? (opt_data.tagName == 'button' || opt_data.tagName == 'input') ? ' disabled="disabled" ' : '' : '') : '') + ((opt_data.dropdown2Target) ? ' aria-owns="' + soy.$$escapeHtml(opt_data.dropdown2Target) + '" aria-haspopup="true"' : '') + ((opt_data.tagName == 'a') ? ' tabindex="0"' : '');
  return output;
};
if (goog.DEBUG) {
  aui.buttons.buttonAttributes.soyTemplateName = 'aui.buttons.buttonAttributes';
}


aui.buttons.buttonIcon = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '' + ((opt_data.iconType) ? '<span class="' + ((opt_data.iconType == 'aui') ? 'aui-icon' : '') + ((opt_data.iconClass) ? ' ' + soy.$$escapeHtml(opt_data.iconClass) : '') + '">' + ((opt_data.iconText) ? soy.$$escapeHtml(opt_data.iconText) + ' ' : '') + '</span>' : '');
};
if (goog.DEBUG) {
  aui.buttons.buttonIcon.soyTemplateName = 'aui.buttons.buttonIcon';
}


aui.buttons.splitButton = function(opt_data, opt_ignored) {
  return '' + aui.buttons.button(soy.$$augmentMap(opt_data.splitButtonMain, {splitButtonType: 'main'})) + aui.buttons.button(soy.$$augmentMap(opt_data.splitButtonMore, {splitButtonType: 'more'}));
};
if (goog.DEBUG) {
  aui.buttons.splitButton.soyTemplateName = 'aui.buttons.splitButton';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/dropdown.soy' */
// This file was automatically generated from dropdown.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.dropdown.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.dropdown == 'undefined') { aui.dropdown = {}; }


aui.dropdown.trigger = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<a' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-dd-trigger' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '><span class="dropdown-text">' + ((opt_data.accessibilityText) ? soy.$$escapeHtml(opt_data.accessibilityText) : '') + '</span>' + ((! (opt_data.showIcon == false)) ? '<span class="icon icon-dropdown"></span>' : '') + '</a>';
};
if (goog.DEBUG) {
  aui.dropdown.trigger.soyTemplateName = 'aui.dropdown.trigger';
}


aui.dropdown.menu = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'ul') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-dropdown hidden' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'ul') + '>';
};
if (goog.DEBUG) {
  aui.dropdown.menu.soyTemplateName = 'aui.dropdown.menu';
}


aui.dropdown.parent = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-dd-parent' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '>';
};
if (goog.DEBUG) {
  aui.dropdown.parent.soyTemplateName = 'aui.dropdown.parent';
}


aui.dropdown.item = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'li') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="dropdown-item' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '><a href="' + soy.$$escapeHtml(opt_data.url ? opt_data.url : '#') + '">' + soy.$$escapeHtml(opt_data.text) + '</a></' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'li') + '>';
};
if (goog.DEBUG) {
  aui.dropdown.item.soyTemplateName = 'aui.dropdown.item';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/dropdown2.soy' */
// This file was automatically generated from dropdown2.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.dropdown2.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.dropdown2 == 'undefined') { aui.dropdown2 = {}; }


aui.dropdown2.dropdown2 = function(opt_data, opt_ignored) {
  return '' + aui.dropdown2.trigger(soy.$$augmentMap(opt_data.trigger, {menu: opt_data.menu})) + aui.dropdown2.contents(opt_data.menu);
};
if (goog.DEBUG) {
  aui.dropdown2.dropdown2.soyTemplateName = 'aui.dropdown2.dropdown2';
}


aui.dropdown2.trigger = function(opt_data, opt_ignored) {
  return '' + aui.trigger.trigger(soy.$$augmentMap(opt_data, {extraClasses: 'aui-dropdown2-trigger' + aui.renderExtraClasses(opt_data)}));
};
if (goog.DEBUG) {
  aui.dropdown2.trigger.soyTemplateName = 'aui.dropdown2.trigger';
}


aui.dropdown2.contents = function(opt_data, opt_ignored) {
  return '<div id="' + soy.$$escapeHtml(opt_data.id) + '" class="aui-dropdown2' + aui.renderExtraClasses(opt_data) + '" role="menu" aria-hidden="true"' + aui.renderExtraAttributes(opt_data) + '><div role="application">' + ((opt_data.content) ? soy.$$filterNoAutoescape(opt_data.content) : '') + '</div></div>';
};
if (goog.DEBUG) {
  aui.dropdown2.contents.soyTemplateName = 'aui.dropdown2.contents';
}


aui.dropdown2.section = function(opt_data, opt_ignored) {
  return '<div' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-dropdown2-section' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.label) ? '<strong role="presentation" class="aui-dropdown2-heading">' + soy.$$escapeHtml(opt_data.label) + '</strong>' : '') + soy.$$filterNoAutoescape(opt_data.content) + '</div>';
};
if (goog.DEBUG) {
  aui.dropdown2.section.soyTemplateName = 'aui.dropdown2.section';
}


aui.dropdown2.itemGroup = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div ' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' role="presentation" class="aui-dropdown2-section' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.label) ? '<strong role="presentation" class="aui-dropdown2-heading">' + soy.$$escapeHtml(opt_data.label) + '</strong>' : '') + '<div role="group"' + ((opt_data.label) ? ' aria-label="' + soy.$$escapeHtml(opt_data.label) + '"' : '') + '>' + aui.dropdown2.itemList(opt_data) + '</div></div>';
};
if (goog.DEBUG) {
  aui.dropdown2.itemGroup.soyTemplateName = 'aui.dropdown2.itemGroup';
}


aui.dropdown2.itemList = function(opt_data, opt_ignored) {
  var output = '<ul' + ((opt_data.isTruncated) ? ' class="aui-list-truncate"' : '') + ' role="presentation">';
  var itemList76 = opt_data.items;
  var itemListLen76 = itemList76.length;
  for (var itemIndex76 = 0; itemIndex76 < itemListLen76; itemIndex76++) {
    var itemData76 = itemList76[itemIndex76];
    output += '<li ' + ((itemData76.isHidden) ? 'class="aui-dropdown2-hidden" aria-hidden="true"' : '') + ' role="presentation">';
    switch (itemData76.itemType) {
      case 'checkbox':
        output += aui.dropdown2.menuCheckbox(itemData76);
        break;
      case 'radio':
        output += aui.dropdown2.menuRadio(itemData76);
        break;
      default:
        output += aui.dropdown2.menuLink(itemData76);
    }
    output += '</li>';
  }
  output += '</ul>';
  return output;
};
if (goog.DEBUG) {
  aui.dropdown2.itemList.soyTemplateName = 'aui.dropdown2.itemList';
}


aui.dropdown2.menuLink = function(opt_data, opt_ignored) {
  return '<a role="menuitem" tabindex="-1" class="' + aui.renderExtraClasses(opt_data) + ((opt_data.submenuTarget) ? ' aui-dropdown2-sub-trigger' : '') + ((opt_data.isDisabled) ? ' aui-dropdown2-disabled' : '') + '"' + ((opt_data.href) ? ' href="' + soy.$$escapeHtml(opt_data.href) + '"' : '') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.isDisabled) ? ' aria-disabled="' + soy.$$escapeHtml(opt_data.isDisabled) + '"' : '') + ((opt_data.submenuTarget) ? ' aria-controls="' + soy.$$escapeHtml(opt_data.submenuTarget) + '"' : '') + aui.renderExtraAttributes(opt_data) + '>' + soy.$$escapeHtml(opt_data.text) + '</a>';
};
if (goog.DEBUG) {
  aui.dropdown2.menuLink.soyTemplateName = 'aui.dropdown2.menuLink';
}


aui.dropdown2.menuCheckbox = function(opt_data, opt_ignored) {
  return '<span role="menuitemcheckbox" tabindex="-1" class="aui-dropdown2-checkbox' + ((opt_data.isInteractive) ? ' aui-dropdown2-interactive' : '') + ((opt_data.isDisabled) ? ' aui-dropdown2-disabled' : '') + ((opt_data.isChecked) ? ' aui-dropdown2-checked' : '') + aui.renderExtraClasses(opt_data) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.isChecked) ? ' aria-checked="' + soy.$$escapeHtml(opt_data.isChecked) + '"' : ' aria-checked="false"') + ((opt_data.isDisabled) ? ' aria-disabled="' + soy.$$escapeHtml(opt_data.isDisabled) + '"' : '') + aui.renderExtraAttributes(opt_data) + '>' + soy.$$escapeHtml(opt_data.text) + '</span>';
};
if (goog.DEBUG) {
  aui.dropdown2.menuCheckbox.soyTemplateName = 'aui.dropdown2.menuCheckbox';
}


aui.dropdown2.menuRadio = function(opt_data, opt_ignored) {
  return '<span role="menuitemradio" tabindex="-1" class="aui-dropdown2-radio' + ((opt_data.isInteractive) ? ' aui-dropdown2-interactive' : '') + ((opt_data.isDisabled) ? ' aui-dropdown2-disabled' : '') + ((opt_data.isChecked) ? ' aui-dropdown2-checked' : '') + aui.renderExtraClasses(opt_data) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.isChecked) ? ' aria-checked="' + soy.$$escapeHtml(opt_data.isChecked) + '"' : ' aria-checked="false"') + ((opt_data.isDisabled) ? ' aria-disabled="' + soy.$$escapeHtml(opt_data.isDisabled) + '"' : '') + aui.renderExtraAttributes(opt_data) + '>' + soy.$$escapeHtml(opt_data.text) + '</span>';
};
if (goog.DEBUG) {
  aui.dropdown2.menuRadio.soyTemplateName = 'aui.dropdown2.menuRadio';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/form.soy' */
// This file was automatically generated from form.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.form.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.form == 'undefined') { aui.form = {}; }


aui.form.form = function(opt_data, opt_ignored) {
  return '<form' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui' + ((opt_data.isUnsectioned) ? ' unsectioned' : '') + ((opt_data.isLongLabels) ? ' long-label' : '') + ((opt_data.isTopLabels) ? ' top-label' : '') + aui.renderExtraClasses(opt_data) + '" action="' + soy.$$escapeHtml(opt_data.action) + '" method="' + soy.$$escapeHtml(opt_data.method ? opt_data.method : 'post') + '"' + ((opt_data.enctype) ? ' enctype="' + soy.$$escapeHtml(opt_data.enctype) + '"' : '') + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</form>';
};
if (goog.DEBUG) {
  aui.form.form.soyTemplateName = 'aui.form.form';
}


aui.form.formDescription = function(opt_data, opt_ignored) {
  return '<div' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="field-group' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</div>';
};
if (goog.DEBUG) {
  aui.form.formDescription.soyTemplateName = 'aui.form.formDescription';
}


aui.form.fieldset = function(opt_data, opt_ignored) {
  var output = '';
  var hasClass__soy51 = opt_data.isInline || opt_data.isDateSelect || opt_data.isGroup || opt_data.extraClasses;
  output += '<fieldset' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((hasClass__soy51) ? ' class="' + soy.$$escapeHtml(opt_data.isInline ? 'inline' : opt_data.isDateSelect ? 'date-select' : opt_data.isGroup ? 'group' : '') + aui.renderExtraClasses(opt_data) + '"' : '') + aui.renderExtraAttributes(opt_data) + '><legend><span>' + soy.$$filterNoAutoescape(opt_data.legendContent) + '</span></legend>' + soy.$$filterNoAutoescape(opt_data.content) + '</fieldset>';
  return output;
};
if (goog.DEBUG) {
  aui.form.fieldset.soyTemplateName = 'aui.form.fieldset';
}


aui.form.fieldGroup = function(opt_data, opt_ignored) {
  return '<div' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="field-group' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</div>';
};
if (goog.DEBUG) {
  aui.form.fieldGroup.soyTemplateName = 'aui.form.fieldGroup';
}


aui.form.buttons = function(opt_data, opt_ignored) {
  return '<div class="buttons-container' + ((opt_data.alignment) ? ' ' + soy.$$escapeHtml(opt_data.alignment) : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '><div class="buttons">' + soy.$$filterNoAutoescape(opt_data.content) + '</div></div>';
};
if (goog.DEBUG) {
  aui.form.buttons.soyTemplateName = 'aui.form.buttons';
}


aui.form.label = function(opt_data, opt_ignored) {
  return '<label' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.forField) ? ' for="' + soy.$$escapeHtml(opt_data.forField) + '"' : '') + ((opt_data.extraClasses) ? ' class="' + aui.renderExtraClasses(opt_data) + '"' : '') + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + ((opt_data.isRequired) ? '<span class="aui-icon icon-required"></span>' : '') + '</label>';
};
if (goog.DEBUG) {
  aui.form.label.soyTemplateName = 'aui.form.label';
}


aui.form.input = function(opt_data, opt_ignored) {
  var output = '';
  var baseType__soy126 = '';
  switch (opt_data.type) {
    case 'password':
    case 'email':
    case 'url':
    case 'tel':
    case 'search':
      baseType__soy126 += 'text';
      break;
    case 'submit':
    case 'reset':
      baseType__soy126 += 'button';
      break;
    default:
      baseType__soy126 += soy.$$escapeHtml(opt_data.type);
  }
  output += '<input class="' + soy.$$escapeHtml(baseType__soy126) + aui.renderExtraClasses(opt_data) + ((opt_data.icon && baseType__soy126 == 'text') ? ' aui-field-has-icon' : '') + '" type="' + soy.$$escapeHtml(opt_data.type) + '" name="' + ((opt_data.name) ? soy.$$escapeHtml(opt_data.name) : soy.$$escapeHtml(opt_data.id)) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.value) ? ' value="' + soy.$$escapeHtml(opt_data.value) + '"' : '') + (((opt_data.type == 'checkbox' || opt_data.type == 'radio') && opt_data.isChecked) ? ' checked="checked"' : '') + ((baseType__soy126 == 'text' && opt_data.type != 'password' && opt_data.maxLength) ? ' maxlength="' + soy.$$escapeHtml(opt_data.maxLength) + '"' : '') + ((baseType__soy126 == 'text' && opt_data.type != 'password' && opt_data.size) ? ' size="' + soy.$$escapeHtml(opt_data.size) + '"' : '') + ((baseType__soy126 == 'text' && opt_data.placeholderText) ? ' placeholder="' + soy.$$escapeHtml(opt_data.placeholderText) + '"' : '') + ((baseType__soy126 == 'text' && opt_data.autocomplete) ? ' autocomplete="' + soy.$$escapeHtml(opt_data.autocomplete) + '"' : '') + ((opt_data.isDisabled) ? ' disabled' : '') + ((opt_data.isAutofocus) ? ' autofocus' : '') + aui.renderExtraAttributes(opt_data) + aui.form.renderValidationArguments(opt_data) + aui.form.renderInfoMessage(opt_data) + aui.form.renderFieldComponentAttribute(opt_data) + aui.form.renderTooltipArguments(opt_data) + '/>' + ((opt_data.icon && baseType__soy126 == 'text') ? aui.icons.icon({icon: opt_data.icon, useIconFont: true, size: 'small'}) : '');
  return output;
};
if (goog.DEBUG) {
  aui.form.input.soyTemplateName = 'aui.form.input';
}


aui.form.renderValidationArguments = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.validationArguments) {
    var argumentList203 = soy.$$getMapKeys(opt_data.validationArguments);
    var argumentListLen203 = argumentList203.length;
    for (var argumentIndex203 = 0; argumentIndex203 < argumentListLen203; argumentIndex203++) {
      var argumentData203 = argumentList203[argumentIndex203];
      output += (argumentData203 == 'required' || argumentData203 == 'pattern' || argumentData203 == 'min' || argumentData203 == 'max' || argumentData203 == 'minlength' || argumentData203 == 'maxlength') ? ' ' + soy.$$escapeHtml(argumentData203) + '="' + soy.$$escapeHtml(opt_data.validationArguments[argumentData203]) + '"' : ' ' + soy.$$escapeHtml('data-aui-validation-' + argumentData203) + '="' + soy.$$escapeHtml(opt_data.validationArguments[argumentData203]) + '"';
    }
  }
  return output;
};
if (goog.DEBUG) {
  aui.form.renderValidationArguments.soyTemplateName = 'aui.form.renderValidationArguments';
}


aui.form.renderTooltipArguments = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.tooltipArguments) {
    var argumentList221 = soy.$$getMapKeys(opt_data.tooltipArguments);
    var argumentListLen221 = argumentList221.length;
    for (var argumentIndex221 = 0; argumentIndex221 < argumentListLen221; argumentIndex221++) {
      var argumentData221 = argumentList221[argumentIndex221];
      output += ' ' + soy.$$escapeHtml('data-aui-notification-' + argumentData221) + '="' + soy.$$escapeHtml(opt_data.tooltipArguments[argumentData221]) + '"';
    }
  }
  return output;
};
if (goog.DEBUG) {
  aui.form.renderTooltipArguments.soyTemplateName = 'aui.form.renderTooltipArguments';
}


aui.form.renderInfoMessage = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '' + ((opt_data.infoMessage) ? ' data-aui-notification-info="' + soy.$$escapeHtml(opt_data.infoMessage) + '"' : '');
};
if (goog.DEBUG) {
  aui.form.renderInfoMessage.soyTemplateName = 'aui.form.renderInfoMessage';
}


aui.form.renderFieldComponentAttribute = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '' + ((opt_data.infoMessage) ? ' data-aui-notification-field' : '') + ((opt_data.validationArguments) ? ' data-aui-validation-field' : '');
};
if (goog.DEBUG) {
  aui.form.renderFieldComponentAttribute.soyTemplateName = 'aui.form.renderFieldComponentAttribute';
}


aui.form.submit = function(opt_data, opt_ignored) {
  return '' + aui.form.button(soy.$$augmentMap(opt_data, {tagName: 'input', inputType: 'submit'}));
};
if (goog.DEBUG) {
  aui.form.submit.soyTemplateName = 'aui.form.submit';
}


aui.form.button = function(opt_data, opt_ignored) {
  return '' + aui.buttons.button(soy.$$augmentMap(opt_data, {extraClasses: opt_data.extraClasses, extraAttributes: '' + ((opt_data.name) ? 'name="' + soy.$$escapeHtml(opt_data.name) + '"' : '') + aui.renderExtraAttributes(opt_data)}));
};
if (goog.DEBUG) {
  aui.form.button.soyTemplateName = 'aui.form.button';
}


aui.form.linkButton = function(opt_data, opt_ignored) {
  return '' + aui.buttons.button(soy.$$augmentMap(opt_data, {tagName: 'a', type: 'link', href: opt_data.href ? opt_data.href : opt_data.url, extraClasses: 'cancel' + aui.renderExtraClasses(opt_data), extraAttributes: '' + ((opt_data.name) ? 'name="' + soy.$$escapeHtml(opt_data.name) + '"' : '') + aui.renderExtraAttributes(opt_data)}));
};
if (goog.DEBUG) {
  aui.form.linkButton.soyTemplateName = 'aui.form.linkButton';
}


aui.form.textarea = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<textarea name="' + ((opt_data.name) ? soy.$$escapeHtml(opt_data.name) : soy.$$escapeHtml(opt_data.id)) + '" class="textarea' + aui.renderExtraClasses(opt_data) + ' ' + ((opt_data.icon) ? 'aui-field-has-icon' : '') + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.rows) ? ' rows="' + soy.$$escapeHtml(opt_data.rows) + '"' : '') + ((opt_data.cols) ? ' cols="' + soy.$$escapeHtml(opt_data.cols) + '"' : '') + ((opt_data.autocomplete) ? ' autocomplete="' + soy.$$escapeHtml(opt_data.autocomplete) + '"' : '') + ((opt_data.isDisabled) ? ' disabled' : '') + ((opt_data.isAutofocus) ? ' autofocus' : '') + ((opt_data.placeholderText) ? ' placeholder="' + soy.$$escapeHtml(opt_data.placeholderText) + '"' : '') + aui.renderExtraAttributes(opt_data) + aui.form.renderValidationArguments(opt_data) + aui.form.renderInfoMessage(opt_data) + aui.form.renderFieldComponentAttribute(opt_data) + aui.form.renderTooltipArguments(opt_data) + '>' + ((opt_data.value) ? soy.$$escapeHtml(opt_data.value) : '') + '</textarea>' + ((opt_data.icon) ? aui.icons.icon({icon: opt_data.icon, useIconFont: true, size: 'small'}) : '');
};
if (goog.DEBUG) {
  aui.form.textarea.soyTemplateName = 'aui.form.textarea';
}


aui.form.select = function(opt_data, opt_ignored) {
  var output = '<select' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' name="' + ((opt_data.name) ? soy.$$escapeHtml(opt_data.name) : soy.$$escapeHtml(opt_data.id)) + '" class="' + soy.$$escapeHtml(opt_data.isMultiple ? 'multi-select' : 'select') + aui.renderExtraClasses(opt_data) + '"' + ((opt_data.size) ? ' size="' + soy.$$escapeHtml(opt_data.size) + '"' : '') + ((opt_data.isDisabled) ? ' disabled' : '') + ((opt_data.isAutofocus) ? ' autofocus' : '') + ((opt_data.isMultiple) ? ' multiple' : '') + aui.renderExtraAttributes(opt_data) + aui.form.renderValidationArguments(opt_data) + aui.form.renderInfoMessage(opt_data) + aui.form.renderFieldComponentAttribute(opt_data) + aui.form.renderTooltipArguments(opt_data) + '>' + ((opt_data.defaultOption) ? aui.form.optionOrOptgroup(soy.$$augmentMap(opt_data.defaultOption, {defaultValue: opt_data.value})) : '');
  var optionList379 = opt_data.options;
  var optionListLen379 = optionList379.length;
  for (var optionIndex379 = 0; optionIndex379 < optionListLen379; optionIndex379++) {
    var optionData379 = optionList379[optionIndex379];
    output += aui.form.optionOrOptgroup(soy.$$augmentMap(optionData379, {defaultValue: opt_data.value}));
  }
  output += '</select>';
  return output;
};
if (goog.DEBUG) {
  aui.form.select.soyTemplateName = 'aui.form.select';
}


aui.form.optionOrOptgroup = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.options) {
    output += '<optgroup label="' + soy.$$escapeHtml(opt_data.text) + '"' + ((opt_data.disabled) ? ' disabled' : '') + '>';
    var optionList394 = opt_data.options;
    var optionListLen394 = optionList394.length;
    for (var optionIndex394 = 0; optionIndex394 < optionListLen394; optionIndex394++) {
      var optionData394 = optionList394[optionIndex394];
      output += aui.form.optionOrOptgroup(soy.$$augmentMap(optionData394, {defaultValue: opt_data.defaultValue}));
    }
    output += '</optgroup>';
  } else {
    output += '<option value="' + soy.$$escapeHtml(opt_data.value) + '"' + ((opt_data.selected || opt_data.defaultValue == opt_data.value) ? ' selected' : '') + ((opt_data.disabled) ? ' disabled' : '') + '>' + soy.$$escapeHtml(opt_data.text) + '</option>';
  }
  return output;
};
if (goog.DEBUG) {
  aui.form.optionOrOptgroup.soyTemplateName = 'aui.form.optionOrOptgroup';
}


aui.form.value = function(opt_data, opt_ignored) {
  return '<span' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="field-value' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</span>';
};
if (goog.DEBUG) {
  aui.form.value.soyTemplateName = 'aui.form.value';
}


aui.form.field = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '';
  var isCheckboxOrRadio__soy428 = opt_data.type == 'checkbox' || opt_data.type == 'radio';
  var fieldWidthClass__soy429 = opt_data.fieldWidth ? opt_data.fieldWidth + '-field ' : '';
  var fieldClasses__soy430 = fieldWidthClass__soy429 + (opt_data.extraFieldClasses ? opt_data.extraFieldClasses : '');
  output += '<div class="' + ((isCheckboxOrRadio__soy428) ? soy.$$escapeHtml(opt_data.type) : 'field-group') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.labelContent && ! isCheckboxOrRadio__soy428) ? aui.form.label({forField: opt_data.id, isRequired: opt_data.isRequired, content: opt_data.labelContent}) : '');
  switch (opt_data.type) {
    case 'textarea':
      output += aui.form.textarea({id: opt_data.id, name: opt_data.name, value: opt_data.value, rows: opt_data.rows, cols: opt_data.cols, autocomplete: opt_data.autocomplete, placeholderText: opt_data.placeholderText, isDisabled: opt_data.isDisabled ? true : false, isAutofocus: opt_data.isAutofocus, extraClasses: fieldClasses__soy430, icon: opt_data.icon, validationArguments: opt_data.validationArguments, infoMessage: opt_data.infoMessage, tooltipArguments: opt_data.tooltipArguments});
      break;
    case 'select':
      output += aui.form.select({id: opt_data.id, name: opt_data.name, value: opt_data.value, options: opt_data.options, isMultiple: opt_data.isMultiple, size: opt_data.size, isDisabled: opt_data.isDisabled ? true : false, isAutofocus: opt_data.isAutofocus, extraClasses: fieldClasses__soy430, validationArguments: opt_data.validationArguments, infoMessage: opt_data.infoMessage, tooltipArguments: opt_data.tooltipArguments});
      break;
    case 'value':
      output += aui.form.value({id: opt_data.id, content: '' + soy.$$escapeHtml(opt_data.value), extraClasses: fieldClasses__soy430});
      break;
    case 'text':
    case 'password':
    case 'email':
    case 'url':
    case 'tel':
    case 'search':
    case 'file':
    case 'radio':
    case 'checkbox':
    case 'button':
    case 'submit':
    case 'reset':
      output += aui.form.input({id: opt_data.id, name: opt_data.name, type: opt_data.type, value: opt_data.value, maxLength: opt_data.maxLength, size: opt_data.size, autocomplete: opt_data.autocomplete, placeholderText: opt_data.placeholderText, isChecked: opt_data.isChecked, isDisabled: opt_data.isDisabled ? true : false, isAutofocus: opt_data.isAutofocus, extraClasses: fieldClasses__soy430, icon: opt_data.icon, validationArguments: opt_data.validationArguments, infoMessage: opt_data.infoMessage, tooltipArguments: opt_data.tooltipArguments});
      break;
  }
  output += ((opt_data.labelContent && isCheckboxOrRadio__soy428) ? aui.form.label({forField: opt_data.id, isRequired: opt_data.isRequired, content: opt_data.labelContent}) : '') + ((opt_data.descriptionText || opt_data.descriptionContent) ? aui.form.fieldDescription({text: opt_data.descriptionText, content: opt_data.descriptionContent}) : '');
  if (opt_data.errorTexts) {
    var errorList516 = opt_data.errorTexts;
    var errorListLen516 = errorList516.length;
    for (var errorIndex516 = 0; errorIndex516 < errorListLen516; errorIndex516++) {
      var errorData516 = errorList516[errorIndex516];
      output += aui.form.fieldError({message: errorData516});
    }
  }
  output += '</div>';
  return output;
};
if (goog.DEBUG) {
  aui.form.field.soyTemplateName = 'aui.form.field';
}


aui.form.fieldError = function(opt_data, opt_ignored) {
  return '<div class="error' + aui.renderExtraClasses(opt_data) + '">' + soy.$$escapeHtml(opt_data.message) + '</div>';
};
if (goog.DEBUG) {
  aui.form.fieldError.soyTemplateName = 'aui.form.fieldError';
}


aui.form.fieldDescription = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div class="description' + aui.renderExtraClasses(opt_data) + '">' + ((opt_data.text) ? soy.$$escapeHtml(opt_data.text) : (opt_data.message) ? soy.$$escapeHtml(opt_data.message) : soy.$$filterNoAutoescape(opt_data.content)) + '</div>';
};
if (goog.DEBUG) {
  aui.form.fieldDescription.soyTemplateName = 'aui.form.fieldDescription';
}


aui.form.textField = function(opt_data, opt_ignored) {
  return '' + aui.form.field(soy.$$augmentMap(opt_data, {type: 'text'}));
};
if (goog.DEBUG) {
  aui.form.textField.soyTemplateName = 'aui.form.textField';
}


aui.form.textareaField = function(opt_data, opt_ignored) {
  return '' + aui.form.field(soy.$$augmentMap(opt_data, {type: 'textarea'}));
};
if (goog.DEBUG) {
  aui.form.textareaField.soyTemplateName = 'aui.form.textareaField';
}


aui.form.passwordField = function(opt_data, opt_ignored) {
  return '' + aui.form.field(soy.$$augmentMap(opt_data, {type: 'password'}));
};
if (goog.DEBUG) {
  aui.form.passwordField.soyTemplateName = 'aui.form.passwordField';
}


aui.form.fileField = function(opt_data, opt_ignored) {
  return '' + aui.form.field(soy.$$augmentMap(opt_data, {type: 'file'}));
};
if (goog.DEBUG) {
  aui.form.fileField.soyTemplateName = 'aui.form.fileField';
}


aui.form.selectField = function(opt_data, opt_ignored) {
  return '' + aui.form.field(soy.$$augmentMap(opt_data, {type: 'select'}));
};
if (goog.DEBUG) {
  aui.form.selectField.soyTemplateName = 'aui.form.selectField';
}


aui.form.checkboxField = function(opt_data, opt_ignored) {
  var param561 = '' + ((opt_data.isMatrix) ? '<div class="matrix">' : '');
  var fieldList565 = opt_data.fields;
  var fieldListLen565 = fieldList565.length;
  for (var fieldIndex565 = 0; fieldIndex565 < fieldListLen565; fieldIndex565++) {
    var fieldData565 = fieldList565[fieldIndex565];
    param561 += aui.form.field(soy.$$augmentMap(fieldData565, {type: 'checkbox', labelContent: '' + soy.$$escapeHtml(fieldData565.labelText), extraFieldClasses: opt_data.extraFieldClasses}));
  }
  param561 += ((opt_data.isMatrix) ? '</div>' : '') + ((opt_data.descriptionText || opt_data.descriptionContent || opt_data.errorTexts && opt_data.errorTexts.length) ? aui.form.field({descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, isDisabled: false}) : '');
  var output = '' + aui.form.fieldset({legendContent: opt_data.legendContent + (opt_data.isRequired ? '<span class="aui-icon icon-required"></span>' : ''), isGroup: true, id: opt_data.id, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: param561});
  return output;
};
if (goog.DEBUG) {
  aui.form.checkboxField.soyTemplateName = 'aui.form.checkboxField';
}


aui.form.radioField = function(opt_data, opt_ignored) {
  var param589 = '' + ((opt_data.isMatrix) ? '<div class="matrix">' : '');
  var fieldList593 = opt_data.fields;
  var fieldListLen593 = fieldList593.length;
  for (var fieldIndex593 = 0; fieldIndex593 < fieldListLen593; fieldIndex593++) {
    var fieldData593 = fieldList593[fieldIndex593];
    param589 += aui.form.field(soy.$$augmentMap(fieldData593, {type: 'radio', name: opt_data.name ? opt_data.name : opt_data.id, labelContent: '' + soy.$$escapeHtml(fieldData593.labelText), extraFieldClasses: opt_data.extraFieldClasses}));
  }
  param589 += ((opt_data.isMatrix) ? '</div>' : '') + ((opt_data.descriptionText || opt_data.descriptionContent || opt_data.errorTexts && opt_data.errorTexts.length) ? aui.form.field({descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, isDisabled: false}) : '');
  var output = '' + aui.form.fieldset({legendContent: opt_data.legendContent + (opt_data.isRequired ? '<span class="aui-icon icon-required"></span>' : ''), isGroup: true, id: opt_data.id, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: param589});
  return output;
};
if (goog.DEBUG) {
  aui.form.radioField.soyTemplateName = 'aui.form.radioField';
}


aui.form.valueField = function(opt_data, opt_ignored) {
  return '' + aui.form.field(soy.$$augmentMap(opt_data, {type: 'value'}));
};
if (goog.DEBUG) {
  aui.form.valueField.soyTemplateName = 'aui.form.valueField';
}


aui.form.emailField = function(opt_data, opt_ignored) {
  return '' + aui.form.field(soy.$$augmentMap(opt_data, {type: 'email'}));
};
if (goog.DEBUG) {
  aui.form.emailField.soyTemplateName = 'aui.form.emailField';
}


aui.form.urlField = function(opt_data, opt_ignored) {
  return '' + aui.form.field(soy.$$augmentMap(opt_data, {type: 'url'}));
};
if (goog.DEBUG) {
  aui.form.urlField.soyTemplateName = 'aui.form.urlField';
}


aui.form.telephoneField = function(opt_data, opt_ignored) {
  return '' + aui.form.field(soy.$$augmentMap(opt_data, {type: 'tel'}));
};
if (goog.DEBUG) {
  aui.form.telephoneField.soyTemplateName = 'aui.form.telephoneField';
}


aui.form.searchField = function(opt_data, opt_ignored) {
  return '' + aui.form.field(soy.$$augmentMap(opt_data, {type: 'search'}));
};
if (goog.DEBUG) {
  aui.form.searchField.soyTemplateName = 'aui.form.searchField';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/group.soy' */
// This file was automatically generated from group.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.group.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.group == 'undefined') { aui.group = {}; }


aui.group.group = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-group' + ((opt_data.isSplit) ? ' aui-group-split' : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '>';
};
if (goog.DEBUG) {
  aui.group.group.soyTemplateName = 'aui.group.group';
}


aui.group.item = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-item' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '>';
};
if (goog.DEBUG) {
  aui.group.item.soyTemplateName = 'aui.group.item';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/labels.soy' */
// This file was automatically generated from labels.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.labels.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.labels == 'undefined') { aui.labels = {}; }


aui.labels.label = function(opt_data, opt_ignored) {
  return '' + ((opt_data.url && opt_data.isCloseable == true) ? '<span' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-label aui-label-closeable aui-label-split' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '><a class="aui-label-split-main" href="' + soy.$$escapeHtml(opt_data.url) + '">' + soy.$$escapeHtml(opt_data.text) + '</a><span class="aui-label-split-close" >' + aui.labels.closeIcon(opt_data) + '</span></span>' : '<' + soy.$$escapeHtml(opt_data.url ? 'a' : 'span') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-label' + ((opt_data.isCloseable) ? ' aui-label-closeable' : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + ((opt_data.url) ? ' href="' + soy.$$escapeHtml(opt_data.url) + '"' : '') + '>' + soy.$$escapeHtml(opt_data.text) + ((opt_data.isCloseable) ? aui.labels.closeIcon(opt_data) : '') + '</' + soy.$$escapeHtml(opt_data.url ? 'a' : 'span') + '>');
};
if (goog.DEBUG) {
  aui.labels.label.soyTemplateName = 'aui.labels.label';
}


aui.labels.closeIcon = function(opt_data, opt_ignored) {
  return '<span tabindex="0" class="aui-icon aui-icon-close"' + ((opt_data.hasTitle != false) ? ' title="' + aui.labels.closeIconText(opt_data) + '"' : '') + '>' + aui.labels.closeIconText(opt_data) + '</span>';
};
if (goog.DEBUG) {
  aui.labels.closeIcon.soyTemplateName = 'aui.labels.closeIcon';
}


aui.labels.closeIconText = function(opt_data, opt_ignored) {
  return '' + ((opt_data.closeIconText) ? soy.$$escapeHtml(opt_data.closeIconText) : '(' + soy.$$escapeHtml('aui.words.remove') + ' ' + soy.$$escapeHtml(opt_data.text) + ')');
};
if (goog.DEBUG) {
  aui.labels.closeIconText.soyTemplateName = 'aui.labels.closeIconText';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/message.soy' */
// This file was automatically generated from message.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.message.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.message == 'undefined') { aui.message = {}; }


aui.message.info = function(opt_data, opt_ignored) {
  return '' + aui.message.message(soy.$$augmentMap(opt_data, {type: 'info'}));
};
if (goog.DEBUG) {
  aui.message.info.soyTemplateName = 'aui.message.info';
}


aui.message.warning = function(opt_data, opt_ignored) {
  return '' + aui.message.message(soy.$$augmentMap(opt_data, {type: 'warning'}));
};
if (goog.DEBUG) {
  aui.message.warning.soyTemplateName = 'aui.message.warning';
}


aui.message.error = function(opt_data, opt_ignored) {
  return '' + aui.message.message(soy.$$augmentMap(opt_data, {type: 'error'}));
};
if (goog.DEBUG) {
  aui.message.error.soyTemplateName = 'aui.message.error';
}


aui.message.success = function(opt_data, opt_ignored) {
  return '' + aui.message.message(soy.$$augmentMap(opt_data, {type: 'success'}));
};
if (goog.DEBUG) {
  aui.message.success.soyTemplateName = 'aui.message.success';
}


aui.message.hint = function(opt_data, opt_ignored) {
  return '' + aui.message.message(soy.$$augmentMap(opt_data, {type: 'hint'}));
};
if (goog.DEBUG) {
  aui.message.hint.soyTemplateName = 'aui.message.hint';
}


aui.message.generic = function(opt_data, opt_ignored) {
  return '' + aui.message.message(soy.$$augmentMap(opt_data, {type: 'generic'}));
};
if (goog.DEBUG) {
  aui.message.generic.soyTemplateName = 'aui.message.generic';
}


aui.message.message = function(opt_data, opt_ignored) {
  var output = '';
  var theTagName__soy21 = opt_data.tagName ? opt_data.tagName : 'div';
  var theType__soy22 = opt_data.type ? opt_data.type : 'generic';
  output += '<' + soy.$$escapeHtml(theTagName__soy21) + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-message aui-message-' + soy.$$escapeHtml(theType__soy22) + ' ' + soy.$$escapeHtml(theType__soy22) + ((opt_data.isCloseable) ? ' closeable' : '') + ((opt_data.isShadowed) ? ' shadowed' : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.titleContent) ? '<p class="title"><strong>' + soy.$$filterNoAutoescape(opt_data.titleContent) + '</strong></p>' : '') + soy.$$filterNoAutoescape(opt_data.content) + ((opt_data.isCloseable) ? '<span class="aui-icon icon-close" role="button" tabindex="0"></span>' : '') + '</' + soy.$$escapeHtml(theTagName__soy21) + '>';
  return output;
};
if (goog.DEBUG) {
  aui.message.message.soyTemplateName = 'aui.message.message';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/page.soy' */
// This file was automatically generated from page.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.page.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.page == 'undefined') { aui.page = {}; }


aui.page.document = function(opt_data, opt_ignored, opt_ijData) {
  return '<!DOCTYPE html><html lang="' + soy.$$escapeHtml(opt_ijData.language ? opt_ijData.language : 'en') + '">' + aui.page.documentHTMLContent(opt_data, null, opt_ijData) + '</html>';
};
if (goog.DEBUG) {
  aui.page.document.soyTemplateName = 'aui.page.document';
}


aui.page.documentHTMLContent = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var thePageSize__soy9 = opt_data.pageSize ? opt_data.pageSize : opt_data.focusedPageSize ? opt_data.focusedPageSize : 'xlarge';
  output += '<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>' + soy.$$escapeHtml(opt_data.windowTitle) + '</title>' + ((opt_data.headContent) ? soy.$$filterNoAutoescape(opt_data.headContent) : '') + '</head><body' + ((opt_data.pageType) ? (opt_data.pageType == 'generic') ? (opt_data.extraClasses) ? ' class="' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' : '' : (opt_data.pageType == 'focused') ? ' class="aui-page-focused aui-page-focused-' + soy.$$escapeHtml(thePageSize__soy9) + ' aui-page-size-' + soy.$$escapeHtml(thePageSize__soy9) + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' : (opt_data.pageType == 'notification') ? ' class="aui-page-notification aui-page-size-' + soy.$$escapeHtml(thePageSize__soy9) + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' : (opt_data.pageType == 'sidebar') ? ' class="aui-page-sidebar' + soy.$$escapeHtml(opt_data.sidebarState ? ' aui-sidebar-' + opt_data.sidebarState : '') + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' : ' class="aui-page-' + soy.$$escapeHtml(opt_data.pageType) + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' : ' class="' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"') + aui.renderExtraAttributes(opt_data, null, opt_ijData) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</body>';
  return output;
};
if (goog.DEBUG) {
  aui.page.documentHTMLContent.soyTemplateName = 'aui.page.documentHTMLContent';
}


aui.page.page = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="page"><header id="header" role="banner">' + soy.$$filterNoAutoescape(opt_data.headerContent) + '</header><!-- #header --><section id="content" role="main">' + soy.$$filterNoAutoescape(opt_data.contentContent) + '</section><!-- #content --><footer id="footer" role="contentinfo">' + soy.$$filterNoAutoescape(opt_data.footerContent) + '</footer><!-- #footer --></div><!-- #page -->';
};
if (goog.DEBUG) {
  aui.page.page.soyTemplateName = 'aui.page.page';
}


aui.page.header = function(opt_data, opt_ignored, opt_ijData) {
  return ((opt_data.bannerContent) ? '<div class="aui-banner aui-banner-error" role="banner">' + soy.$$filterNoAutoescape(opt_data.bannerContent) + '</div>' : '') + '<nav' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-header aui-dropdown2-trigger-group' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' + aui.renderExtraAttributes(opt_data, null, opt_ijData) + ' role="navigation"><div class="aui-header-inner">' + ((opt_data.headerBeforeContent) ? '<div class="aui-header-before">' + soy.$$filterNoAutoescape(opt_data.headerBeforeContent) + '</div>' : '') + '<div class="aui-header-primary"><h1 id="logo" class="aui-header-logo' + ((opt_data.headerLogoImageUrl) ? ' aui-header-logo-custom' : (opt_data.logo) ? ' aui-header-logo-' + soy.$$escapeHtml(opt_data.logo) : '') + '"><a href="' + soy.$$escapeHtml(opt_data.headerLink ? opt_data.headerLink : '/') + '">' + ((opt_data.headerLogoImageUrl) ? '<img src="' + soy.$$escapeHtml(opt_data.headerLogoImageUrl) + '" alt="' + soy.$$escapeHtml(opt_data.headerLogoText) + '" />' : '<span class="aui-header-logo-device">' + soy.$$escapeHtml(opt_data.headerLogoText ? opt_data.headerLogoText : '') + '</span>') + ((opt_data.headerText) ? '<span class="aui-header-logo-text">' + soy.$$escapeHtml(opt_data.headerText) + '</span>' : '') + '</a></h1>' + ((opt_data.primaryNavContent) ? soy.$$filterNoAutoescape(opt_data.primaryNavContent) : '') + '</div>' + ((opt_data.secondaryNavContent) ? '<div class="aui-header-secondary">' + soy.$$filterNoAutoescape(opt_data.secondaryNavContent) + '</div>' : '') + ((opt_data.headerAfterContent) ? '<div class="aui-header-after">' + soy.$$filterNoAutoescape(opt_data.headerAfterContent) + '</div>' : '') + '</div><!-- .aui-header-inner--></nav><!-- .aui-header -->';
};
if (goog.DEBUG) {
  aui.page.header.soyTemplateName = 'aui.page.header';
}


aui.page.pagePanel = function(opt_data, opt_ignored, opt_ijData) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ' class="aui-page-panel' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + aui.renderExtraAttributes(opt_data, null, opt_ijData) + '><div class="aui-page-panel-inner">' + soy.$$filterNoAutoescape(opt_data.content) + '</div><!-- .aui-page-panel-inner --></' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '><!-- .aui-page-panel -->';
};
if (goog.DEBUG) {
  aui.page.pagePanel.soyTemplateName = 'aui.page.pagePanel';
}


aui.page.pagePanelNav = function(opt_data, opt_ignored, opt_ijData) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ' class="aui-page-panel-nav' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + aui.renderExtraAttributes(opt_data, null, opt_ijData) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '><!-- .aui-page-panel-nav -->';
};
if (goog.DEBUG) {
  aui.page.pagePanelNav.soyTemplateName = 'aui.page.pagePanelNav';
}


aui.page.pagePanelContent = function(opt_data, opt_ignored, opt_ijData) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section') + ' class="aui-page-panel-content' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + aui.renderExtraAttributes(opt_data, null, opt_ijData) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section') + '><!-- .aui-page-panel-content -->';
};
if (goog.DEBUG) {
  aui.page.pagePanelContent.soyTemplateName = 'aui.page.pagePanelContent';
}


aui.page.pagePanelSidebar = function(opt_data, opt_ignored, opt_ijData) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'aside') + ' class="aui-page-panel-sidebar' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + aui.renderExtraAttributes(opt_data, null, opt_ijData) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'aside') + '><!-- .aui-page-panel-sidebar -->';
};
if (goog.DEBUG) {
  aui.page.pagePanelSidebar.soyTemplateName = 'aui.page.pagePanelSidebar';
}


aui.page.pagePanelItem = function(opt_data, opt_ignored, opt_ijData) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section') + ' class="aui-page-panel-item' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + aui.renderExtraAttributes(opt_data, null, opt_ijData) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section') + '><!-- .aui-page-panel-item -->';
};
if (goog.DEBUG) {
  aui.page.pagePanelItem.soyTemplateName = 'aui.page.pagePanelItem';
}


aui.page.pageHeader = function(opt_data, opt_ignored, opt_ijData) {
  return '<header class="aui-page-header' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + aui.renderExtraAttributes(opt_data, null, opt_ijData) + '><div class="aui-page-header-inner">' + soy.$$filterNoAutoescape(opt_data.content) + '</div><!-- .aui-page-header-inner --></header><!-- .aui-page-header -->';
};
if (goog.DEBUG) {
  aui.page.pageHeader.soyTemplateName = 'aui.page.pageHeader';
}


aui.page.pageHeaderImage = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="aui-page-header-image' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + aui.renderExtraAttributes(opt_data, null, opt_ijData) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</div><!-- .aui-page-header-image -->';
};
if (goog.DEBUG) {
  aui.page.pageHeaderImage.soyTemplateName = 'aui.page.pageHeaderImage';
}


aui.page.pageHeaderMain = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="aui-page-header-main' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + aui.renderExtraAttributes(opt_data, null, opt_ijData) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</div><!-- .aui-page-header-main -->';
};
if (goog.DEBUG) {
  aui.page.pageHeaderMain.soyTemplateName = 'aui.page.pageHeaderMain';
}


aui.page.pageHeaderActions = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="aui-page-header-actions' + aui.renderExtraClasses(opt_data, null, opt_ijData) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + aui.renderExtraAttributes(opt_data, null, opt_ijData) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</div><!-- .aui-page-header-actions -->';
};
if (goog.DEBUG) {
  aui.page.pageHeaderActions.soyTemplateName = 'aui.page.pageHeaderActions';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/panel.soy' */
// This file was automatically generated from panel.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.
 */

if (typeof aui == 'undefined') { var aui = {}; }


aui.panel = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-panel' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '>';
};
if (goog.DEBUG) {
  aui.panel.soyTemplateName = 'aui.panel';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/table.soy' */
// This file was automatically generated from table.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.
 */

if (typeof aui == 'undefined') { var aui = {}; }


aui.table = function(opt_data, opt_ignored) {
  return '<table' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.columnsContent) ? soy.$$filterNoAutoescape(opt_data.columnsContent) : '') + ((opt_data.captionContent) ? '<caption>' + soy.$$filterNoAutoescape(opt_data.captionContent) + '</caption>' : '') + ((opt_data.theadContent) ? '<thead>' + soy.$$filterNoAutoescape(opt_data.theadContent) + '</thead>' : '') + ((opt_data.tfootContent) ? '<tfoot>' + soy.$$filterNoAutoescape(opt_data.tfootContent) + '</tfoot>' : '') + ((! opt_data.contentIncludesTbody) ? '<tbody>' : '') + soy.$$filterNoAutoescape(opt_data.content) + ((! opt_data.contentIncludesTbody) ? '</tbody>' : '') + '</table>';
};
if (goog.DEBUG) {
  aui.table.soyTemplateName = 'aui.table';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/tabs.soy' */
// This file was automatically generated from tabs.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.
 */

if (typeof aui == 'undefined') { var aui = {}; }


aui.tabs = function(opt_data, opt_ignored) {
  var output = '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-tabs ' + soy.$$escapeHtml(opt_data.isVertical ? 'vertical-tabs' : 'horizontal-tabs') + ((opt_data.isDisabled) ? ' aui-tabs-disabled' : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '><ul class="tabs-menu">';
  var itemList19 = opt_data.menuItems;
  var itemListLen19 = itemList19.length;
  for (var itemIndex19 = 0; itemIndex19 < itemListLen19; itemIndex19++) {
    var itemData19 = itemList19[itemIndex19];
    output += aui.tabMenuItem(itemData19);
  }
  output += '</ul>' + soy.$$filterNoAutoescape(opt_data.paneContent) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '>';
  return output;
};
if (goog.DEBUG) {
  aui.tabs.soyTemplateName = 'aui.tabs';
}


aui.tabMenuItem = function(opt_data, opt_ignored) {
  return '<li' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="menu-item' + ((opt_data.isActive) ? ' active-tab' : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '><a href="' + soy.$$escapeHtml(opt_data.url) + '">' + soy.$$escapeHtml(opt_data.text) + '</a></li>';
};
if (goog.DEBUG) {
  aui.tabMenuItem.soyTemplateName = 'aui.tabMenuItem';
}


aui.tabPane = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="tabs-pane' + ((opt_data.isActive) ? ' active-pane' : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '>';
};
if (goog.DEBUG) {
  aui.tabPane.soyTemplateName = 'aui.tabPane';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/trigger.soy' */
// This file was automatically generated from trigger.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.trigger.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.trigger == 'undefined') { aui.trigger = {}; }


aui.trigger.trigger = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'a') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '" ' : '') + ' class="' + aui.renderExtraClasses(opt_data) + '" aria-controls="' + soy.$$escapeHtml(opt_data.menu.id) + '" aria-haspopup="true" role="button"' + ((opt_data.title) ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '') + ((opt_data.container) ? ' data-container="' + soy.$$escapeHtml(opt_data.container) + '"' : '') + (((! opt_data.tagName || opt_data.tagName == 'a') && (! opt_data.extraAttributes || Object.prototype.toString.call(opt_data.extraAttributes) === '[object Object]' && ! opt_data.extraAttributes.href && ! opt_data.extraAttributes.tabindex || (! opt_data.extraAttributes.href || ! opt_data.extraAttributes.tabindex))) ? ' tabindex="0"' : '') + ' data-aui-trigger' + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.content) ? soy.$$filterNoAutoescape(opt_data.content) : '') + ((opt_data.text) ? soy.$$escapeHtml(opt_data.text) : '') + ((! (opt_data.showIcon == false)) ? '<span class="icon ' + soy.$$escapeHtml(opt_data.iconClasses ? opt_data.iconClasses : 'aui-icon-dropdown') + '">' + ((opt_data.iconText) ? soy.$$escapeHtml(opt_data.iconText) : '') + '</span>' : '') + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'a') + '>';
};
if (goog.DEBUG) {
  aui.trigger.trigger.soyTemplateName = 'aui.trigger.trigger';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/toolbar.soy' */
// This file was automatically generated from toolbar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.toolbar.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.toolbar == 'undefined') { aui.toolbar = {}; }


aui.toolbar.toolbar = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-toolbar' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '>';
};
if (goog.DEBUG) {
  aui.toolbar.toolbar.soyTemplateName = 'aui.toolbar.toolbar';
}


aui.toolbar.split = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="toolbar-split toolbar-split-' + soy.$$escapeHtml(opt_data.split) + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '>';
};
if (goog.DEBUG) {
  aui.toolbar.split.soyTemplateName = 'aui.toolbar.split';
}


aui.toolbar.group = function(opt_data, opt_ignored) {
  return '<ul' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="toolbar-group' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</ul>';
};
if (goog.DEBUG) {
  aui.toolbar.group.soyTemplateName = 'aui.toolbar.group';
}


aui.toolbar.item = function(opt_data, opt_ignored) {
  return '<li ' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="toolbar-item' + ((opt_data.isPrimary) ? ' primary' : '') + ((opt_data.isActive) ? ' active' : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</li>';
};
if (goog.DEBUG) {
  aui.toolbar.item.soyTemplateName = 'aui.toolbar.item';
}


aui.toolbar.trigger = function(opt_data, opt_ignored) {
  return '<a' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="toolbar-trigger' + aui.renderExtraClasses(opt_data) + '" href="' + soy.$$escapeHtml(opt_data.url ? opt_data.url : '#') + '"' + ((opt_data.title) ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '') + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</a>';
};
if (goog.DEBUG) {
  aui.toolbar.trigger.soyTemplateName = 'aui.toolbar.trigger';
}


aui.toolbar.button = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '' + aui.toolbar.item({isActive: opt_data.isActive, isPrimary: opt_data.isPrimary, id: opt_data.id, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: '' + aui.toolbar.trigger({url: opt_data.url, title: opt_data.title, content: '' + ((opt_data.iconClass) ? '<span class="icon ' + soy.$$escapeHtml(opt_data.iconClass) + '"></span>' : '') + ((opt_data.text) ? '<span class="trigger-text">' + soy.$$escapeHtml(opt_data.text) + '</span>' : '')})});
};
if (goog.DEBUG) {
  aui.toolbar.button.soyTemplateName = 'aui.toolbar.button';
}


aui.toolbar.link = function(opt_data, opt_ignored) {
  return '' + aui.toolbar.item({id: opt_data.id, extraClasses: 'toolbar-item-link' + aui.renderExtraClasses(opt_data), extraAttributes: opt_data.extraAttributes, content: '' + aui.toolbar.trigger({url: opt_data.url, content: '' + soy.$$escapeHtml(opt_data.text)})});
};
if (goog.DEBUG) {
  aui.toolbar.link.soyTemplateName = 'aui.toolbar.link';
}


aui.toolbar.dropdownInternal = function(opt_data, opt_ignored) {
  return '' + aui.toolbar.item({isPrimary: opt_data.isPrimary, id: opt_data.id, extraClasses: '' + soy.$$filterNoAutoescape(opt_data.itemClass) + aui.renderExtraClasses(opt_data), extraAttributes: opt_data.extraAttributes, content: '' + ((opt_data.splitButtonContent) ? soy.$$filterNoAutoescape(opt_data.splitButtonContent) : '') + aui.dropdown.parent({content: '' + aui.dropdown.trigger({extraClasses: 'toolbar-trigger', accessibilityText: opt_data.text}) + aui.dropdown.menu({content: opt_data.dropdownItemsContent})})});
};
if (goog.DEBUG) {
  aui.toolbar.dropdownInternal.soyTemplateName = 'aui.toolbar.dropdownInternal';
}


aui.toolbar.dropdown = function(opt_data, opt_ignored) {
  return '' + aui.toolbar.dropdownInternal({isPrimary: opt_data.isPrimary, id: opt_data.id, itemClass: 'toolbar-dropdown', extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, text: opt_data.text, dropdownItemsContent: opt_data.dropdownItemsContent});
};
if (goog.DEBUG) {
  aui.toolbar.dropdown.soyTemplateName = 'aui.toolbar.dropdown';
}


aui.toolbar.splitButton = function(opt_data, opt_ignored) {
  return '' + aui.toolbar.dropdownInternal({isPrimary: opt_data.isPrimary, id: opt_data.id, itemClass: 'toolbar-splitbutton', extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, dropdownItemsContent: opt_data.dropdownItemsContent, splitButtonContent: '' + aui.toolbar.trigger({url: opt_data.url, content: '' + soy.$$escapeHtml(opt_data.text)})});
};
if (goog.DEBUG) {
  aui.toolbar.splitButton.soyTemplateName = 'aui.toolbar.splitButton';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/toolbar2.soy' */
// This file was automatically generated from toolbar2.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.toolbar2.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.toolbar2 == 'undefined') { aui.toolbar2 = {}; }


aui.toolbar2.toolbar2 = function(opt_data, opt_ignored) {
  return '<div' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-toolbar2' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + ' role="toolbar"><div class="aui-toolbar2-inner">' + soy.$$filterNoAutoescape(opt_data.content) + '</div></div>';
};
if (goog.DEBUG) {
  aui.toolbar2.toolbar2.soyTemplateName = 'aui.toolbar2.toolbar2';
}


aui.toolbar2.item = function(opt_data, opt_ignored) {
  return '<div' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-toolbar2-' + soy.$$escapeHtml(opt_data.item) + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</div>';
};
if (goog.DEBUG) {
  aui.toolbar2.item.soyTemplateName = 'aui.toolbar2.item';
}


aui.toolbar2.group = function(opt_data, opt_ignored) {
  return '<div' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-toolbar2-group' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + soy.$$filterNoAutoescape(opt_data.content) + '</div>';
};
if (goog.DEBUG) {
  aui.toolbar2.group.soyTemplateName = 'aui.toolbar2.group';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/progress-tracker.soy' */
// This file was automatically generated from progress-tracker.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.progressTracker.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.progressTracker == 'undefined') { aui.progressTracker = {}; }


aui.progressTracker.progressTracker = function(opt_data, opt_ignored) {
  var output = '<ol' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-progress-tracker' + ((opt_data.isInverted) ? ' aui-progress-tracker-inverted' : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>';
  var param18 = '';
  var currentStepList19 = opt_data.steps;
  var currentStepListLen19 = currentStepList19.length;
  for (var currentStepIndex19 = 0; currentStepIndex19 < currentStepListLen19; currentStepIndex19++) {
    var currentStepData19 = currentStepList19[currentStepIndex19];
    if (currentStepData19['isCurrent']) {
      var stepList22 = opt_data.steps;
      var stepListLen22 = stepList22.length;
      for (var stepIndex22 = 0; stepIndex22 < stepListLen22; stepIndex22++) {
        var stepData22 = stepList22[stepIndex22];
        param18 += aui.progressTracker.step(soy.$$augmentMap(stepData22, {width: Math.round(100 / opt_data.steps.length * 10000) / 10000, href: stepIndex22 < currentStepIndex19 ? stepData22['href'] : null}));
      }
    }
  }
  output += aui.progressTracker.content({steps: opt_data.steps, content: param18});
  output += '</ol>';
  return output;
};
if (goog.DEBUG) {
  aui.progressTracker.progressTracker.soyTemplateName = 'aui.progressTracker.progressTracker';
}


aui.progressTracker.content = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.content != '') {
    output += soy.$$filterNoAutoescape(opt_data.content);
  } else {
    var stepList36 = opt_data.steps;
    var stepListLen36 = stepList36.length;
    for (var stepIndex36 = 0; stepIndex36 < stepListLen36; stepIndex36++) {
      var stepData36 = stepList36[stepIndex36];
      output += aui.progressTracker.step(soy.$$augmentMap(stepData36, {isCurrent: stepIndex36 == 0, width: Math.round(100 / opt_data.steps.length * 10000) / 10000, href: null}));
    }
  }
  return output;
};
if (goog.DEBUG) {
  aui.progressTracker.content.soyTemplateName = 'aui.progressTracker.content';
}


aui.progressTracker.step = function(opt_data, opt_ignored) {
  return '<li' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-progress-tracker-step' + ((opt_data.isCurrent) ? ' aui-progress-tracker-step-current' : '') + aui.renderExtraClasses(opt_data) + '" style="width: ' + soy.$$escapeHtml(opt_data.width) + '%;"' + aui.renderExtraAttributes(opt_data) + '><' + soy.$$escapeHtml(opt_data.href ? 'a' : 'span') + ((opt_data.href) ? ' href="' + soy.$$escapeHtml(opt_data.href) + '"' : '') + '>' + soy.$$escapeHtml(opt_data.text) + '</' + soy.$$escapeHtml(opt_data.href ? 'a' : 'span') + '></li>';
};
if (goog.DEBUG) {
  aui.progressTracker.step.soyTemplateName = 'aui.progressTracker.step';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/expander.soy' */
// This file was automatically generated from expander.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.expander.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.expander == 'undefined') { aui.expander = {}; }


aui.expander.content = function(opt_data, opt_ignored) {
  return '<div id="' + soy.$$escapeHtml(opt_data.id) + '" class="aui-expander-content' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + ((opt_data.initiallyExpanded) ? ' aria-expanded="' + soy.$$escapeHtml(opt_data.initiallyExpanded) + '"' : '') + '>' + ((opt_data.content) ? soy.$$filterNoAutoescape(opt_data.content) : '') + '</div>';
};
if (goog.DEBUG) {
  aui.expander.content.soyTemplateName = 'aui.expander.content';
}


aui.expander.trigger = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tag ? opt_data.tag : 'div') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.replaceText) ? ' data-replace-text="' + soy.$$escapeHtml(opt_data.replaceText) + '"' : '') + ((opt_data.replaceSelector) ? ' data-replace-selector="' + soy.$$escapeHtml(opt_data.replaceSelector) + '"' : '') + ' class="aui-expander-trigger' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + ' aria-controls="' + soy.$$escapeHtml(opt_data.contentId) + '"' + ((opt_data.collapsible) ? ' data-collapsible="' + soy.$$escapeHtml(opt_data.collapsible) + '"' : '') + '>' + ((opt_data.content) ? soy.$$filterNoAutoescape(opt_data.content) : '') + '</' + soy.$$escapeHtml(opt_data.tag ? opt_data.tag : 'div') + '>';
};
if (goog.DEBUG) {
  aui.expander.trigger.soyTemplateName = 'aui.expander.trigger';
}


aui.expander.revealText = function(opt_data, opt_ignored) {
  return '' + aui.expander.content({id: opt_data.contentId, content: '' + soy.$$escapeHtml(opt_data.contentContent) + aui.expander.trigger({id: opt_data.triggerId, contentId: opt_data.contentId, tag: 'a', content: '<span class=\'reveal-text-trigger-text\'>Show more</span>', replaceSelector: '.reveal-text-trigger-text', replaceText: 'Show less', extraAttributes: opt_data.triggerExtraAttributes, extraClasses: ((opt_data.triggerExtraClasses) ? soy.$$escapeHtml(opt_data.triggerExtraClasses) + '  ' : '') + ' aui-expander-reveal-text'}), extraAttributes: opt_data.contentExtraAttributes, extraClasses: opt_data.contentExtraClasses});
};
if (goog.DEBUG) {
  aui.expander.revealText.soyTemplateName = 'aui.expander.revealText';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/avatar.soy' */
// This file was automatically generated from avatar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.avatar.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.avatar == 'undefined') { aui.avatar = {}; }


aui.avatar.avatar = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-avatar aui-avatar-' + soy.$$escapeHtml(opt_data.size) + soy.$$escapeHtml(opt_data.isProject ? ' aui-avatar-project' : '') + soy.$$escapeHtml(opt_data.badgeContent ? ' aui-avatar-badged' : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '><span class="aui-avatar-inner"><img src="' + soy.$$escapeHtml(opt_data.avatarImageUrl) + '"' + ((opt_data.accessibilityText) ? ' alt="' + soy.$$escapeHtml(opt_data.accessibilityText) + '"' : '') + ((opt_data.title) ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '') + ((opt_data.imageClasses) ? ' class="' + soy.$$escapeHtml(opt_data.imageClasses) + '"' : '') + ' /></span>' + ((opt_data.badgeContent) ? soy.$$filterNoAutoescape(opt_data.badgeContent) : '') + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span') + '>';
};
if (goog.DEBUG) {
  aui.avatar.avatar.soyTemplateName = 'aui.avatar.avatar';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/icons.soy' */
// This file was automatically generated from icons.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.icons.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.icons == 'undefined') { aui.icons = {}; }


aui.icons.icon = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-icon' + ((opt_data.useIconFont) ? ' aui-icon-' + soy.$$escapeHtml(opt_data.size ? opt_data.size : 'small') : '') + ' aui' + soy.$$escapeHtml(opt_data.useIconFont ? '-iconfont' : '-icon') + soy.$$escapeHtml(opt_data.iconFontSet ? '-' + opt_data.iconFontSet : '') + '-' + soy.$$escapeHtml(opt_data.icon) + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.accessibilityText) ? soy.$$escapeHtml(opt_data.accessibilityText) : '') + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span') + '>';
};
if (goog.DEBUG) {
  aui.icons.icon.soyTemplateName = 'aui.icons.icon';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/lozenges.soy' */
// This file was automatically generated from lozenges.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.lozenges.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.lozenges == 'undefined') { aui.lozenges = {}; }


aui.lozenges.lozenge = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.title) ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '') + ' class="aui-lozenge' + soy.$$escapeHtml(opt_data.type ? ' aui-lozenge-' + opt_data.type : '') + soy.$$escapeHtml(opt_data.isSubtle ? ' aui-lozenge-subtle' : '') + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.maxLength) ? soy.$$truncate(soy.$$escapeHtml(opt_data.text), opt_data.maxLength, true) : soy.$$escapeHtml(opt_data.text)) + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span') + '>';
};
if (goog.DEBUG) {
  aui.lozenges.lozenge.soyTemplateName = 'aui.lozenges.lozenge';
}
;
;
/* module-key = 'com.atlassian.auiplugin:aui-experimental-soy-templates', location = 'src/soy/sidebar.soy' */
// This file was automatically generated from sidebar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.sidebar.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.sidebar == 'undefined') { aui.sidebar = {}; }


aui.sidebar.sidebar = function(opt_data, opt_ignored) {
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.state) ? ' aria-expanded="' + ((opt_data.state == 'collapsed') ? 'false' : 'true') + '"' : '') + ' class="aui-sidebar ' + ((opt_data.isAnimated) ? 'aui-is-animated' : '') + aui.renderExtraClasses(opt_data) + '" ' + ((opt_data.isResponsive == false) ? 'data-aui-responsive="false"' : '') + aui.renderExtraAttributes(opt_data) + '><div class="aui-sidebar-wrapper"><div class="aui-sidebar-body">' + soy.$$filterNoAutoescape(opt_data.headerContent) + soy.$$filterNoAutoescape(opt_data.content) + '</div><div class="aui-sidebar-footer">' + ((opt_data.footerContent) ? soy.$$filterNoAutoescape(opt_data.footerContent) : (opt_data.settingsButtonUrl && opt_data.settingsText) ? '<a href="' + soy.$$escapeHtml(opt_data.settingsButtonUrl) + '" class="aui-button aui-button-subtle aui-sidebar-settings-button' + ((opt_data.isSettingsButtonSelected) ? ' aui-sidebar-settings-selected' : '') + '" data-tooltip="' + soy.$$escapeHtml(opt_data.settingsTooltip ? opt_data.settingsTooltip : opt_data.settingsText) + '"><span class="aui-icon aui-icon-small aui-iconfont-configure"></span><span class="aui-button-label">' + soy.$$escapeHtml(opt_data.settingsText) + '</span></a>' : '') + '<a class="aui-button aui-button-subtle aui-sidebar-toggle aui-sidebar-footer-tipsy" data-tooltip="' + soy.$$escapeHtml('aui.sidebar.expand.tooltip') + '" href="#"><span class="aui-icon aui-icon-small"></span></a></div>' + ((opt_data.isResizable) ? '<div class="aui-sidebar-handle"></div>' : '') + '</div></' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div') + '>';
};
if (goog.DEBUG) {
  aui.sidebar.sidebar.soyTemplateName = 'aui.sidebar.sidebar';
}
;