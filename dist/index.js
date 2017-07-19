!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e["wx-queue-request"]=e["wx-queue-request"]||{})}(this,function(e){"use strict";function t(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;if("function"!=typeof e)throw Error("request must be function");var r=new s(function(e,t){return e(t)},t);return function(t){r.push(function(r){var n=t.complete;t.complete=function(){r(),"function"==typeof n&&n.apply(void 0,arguments)},e(t)})}}var r=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(null==e)e=1;else if(0===e)throw new Error("Concurrency must not be zero");return e},u=function(e){if(null!=e.callback&&"function"!=typeof e.callback)throw new Error("task callback must be a function")},o=function(e){return function(){if(null===e)throw new Error("Callback was already called");var t=e;return e=null,t.apply(void 0,arguments)}},s=function(){function e(t,n){r(this,e),this.queue=t,this.concurrency=i(n),this.buffer=this.concurrency/4,this._workers=[],this._workersList=[],this.paused=!1,this.enableDrain=!0,this.started=!1}return n(e,[{key:"push",value:function(e,t){this.insert(e,t,!0)}},{key:"unshift",value:function(e,t){this.insert(e,t,!1)}},{key:"insert",value:function(e,t,r){var n=this;this.started=!0;for(var i=Array.isArray(e)?e:[e],o=0;o<i.length;o++){var s={task:i[o],callback:t};u(s),r?this._workers.push(s):this._workers.unshift(s)}this._workers.length?setTimeout(function(){n.process()},0):this._drain()}},{key:"process",value:function(){for(var e=this;!this.paused&&this.concurrency>this._workersList.length&&this._workers.length;)!function(){var t=e._workers.shift();e._workersList.push(t),0===e._workers.length&&"function"==typeof e.empty&&e.empty(),e._workersList.length===e.concurrency&&"function"==typeof e.saturated&&e.saturated(),e.queue(t.task,o(function(){for(var r=arguments.length,n=Array(r),i=0;i<r;i++)n[i]=arguments[i];e.pull(t),n[0]&&"function"==typeof e.error&&e.error.apply(e,n.concat([t.task])),"function"==typeof t.callback&&t.callback.apply(t,n),e._workersList.length<=e.concurrency-e.buffer&&"function"==typeof e.unsaturated&&e.unsaturated(),e._drain(),e.process()}))}()}},{key:"length",value:function(){return this._workers.length}},{key:"workersList",value:function(){return this._workersList}},{key:"pull",value:function(e){var t=this._workersList.indexOf(e);-1!==t&&this._workersList.splice(t,1)}},{key:"running",value:function(){return this._workersList.length}},{key:"idle",value:function(){return 0===this._workers.length&&0===this._workersList.length}},{key:"pause",value:function(){this.paused=!0}},{key:"resume",value:function(){this.paused=!1,this.process()}},{key:"kill",value:function(){this.enableDrain=!1,this._workers.length=0}},{key:"_drain",value:function(){var e=this._workersList,t=this._workers,r=this.drain,n=this.enableDrain;0===e.length&&0===t.length&&n&&"function"==typeof r&&this.drain()}},{key:"remove",value:function(e){this._workers=this._workers.filter(function(t,r){var n={data:t.task,priority:r};return!e(n)})}}]),e}();e.queueRequest=t,e.queue=function(e){var r=wx.request;Object.defineProperty(wx,"request",{get:function(){return t(r,e)}})},Object.defineProperty(e,"__esModule",{value:!0})});
