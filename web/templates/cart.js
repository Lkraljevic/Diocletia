(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['cart'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "    <tr class=\"cart__item\">\n        <td>\n            <div class=\"cart-item__image\">\n                "
    + alias3((helpers.modelpreview || (depth0 && depth0.modelpreview) || alias2).call(alias1,(depth0 != null ? depth0.item : depth0),{"name":"modelpreview","hash":{},"data":data}))
    + "\n            </div>\n            <div class=\"cart-item__content\">\n                <div class=\"cart__model\">\n                    "
    + alias3(((helper = (helper = helpers.n || (depth0 != null ? depth0.n : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"n","hash":{},"data":data}) : helper)))
    + "\n                </div>\n                <div class=\"cart__size\">\n                    "
    + alias3(((helper = (helper = helpers.itemSize || (depth0 != null ? depth0.itemSize : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"itemSize","hash":{},"data":data}) : helper)))
    + "\n                </div>\n                <a class=\"cart__remove\" href=\"#\" onclick=\"cart.removeItem('"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "')\">\n                    Remove\n                </a>\n            </div>\n        </td>\n        <td>"
    + alias3(container.lambda(((stack1 = (depth0 != null ? depth0.p : depth0)) != null ? stack1.price : stack1), depth0))
    + "€</td>\n        <td>\n            <input type=\"number\" min=\"1\" max=\"100\" value=\""
    + alias3(((helper = (helper = helpers.q || (depth0 != null ? depth0.q : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"q","hash":{},"data":data}) : helper)))
    + "\" onchange=\"cart.updateItem('"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "',{q:this.value})\">\n        </td>\n        <td>"
    + alias3(((helper = (helper = helpers.modelTotal || (depth0 != null ? depth0.modelTotal : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"modelTotal","hash":{},"data":data}) : helper)))
    + "€</td>\n    </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "\n    <tr class=\"cart_header\">\n        <th>My Cart ("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.items : depth0)) != null ? stack1.length : stack1), depth0))
    + ")</th>\n        <th>Price</th>\n        <th>Qty</th>\n        <th>Total</th>\n    </tr>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    \n    <tr class=\"cart__stotal\">\n        <td></td>\n        <td class=\"cart__subtitle\">Subtotal:\n        </td>\n        <td></td>\n        <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.amount : depth0)) != null ? stack1.total : stack1), depth0))
    + "€</td>\n    </tr>\n    <tr class=\"cart__details\">\n        <td class=\"cart__space-left\">Shipping details</td>\n        <td class=\"cart__space\">\n            <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\" placeholder=\"Enter shipping address\" class=\"cart__textarea\"></textarea>\n        </td>\n    </tr>\n    <tr class=\"cart__total\">\n        <td></td>\n        <td>TOTAL:\n        </td>\n        <td></td>\n        <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.amount : depth0)) != null ? stack1.total : stack1), depth0))
    + "€</td>\n    </tr>\n";
},"useData":true});
})();