/**
 * This places a notice at the upper right corner of your screen.
 *
 * The script contains two functions for managing the processing of notices.
 * The first, newNotice(), checks if any notices have been displayed before.
 * If not, it calls _generateNewMarkup to generate the markup for the notice, 
 * otherwise it just populates the innerHTML of the existing title and description
 * divs with the values from the title and description arguments and adds the .open 
 * class to make the notice area visible. The second method, dismiss(), removes 
 * the .open class, causing the notice to transition off the screen.
 *
 */
var stNotice = {
	newNotice : function (title, description) {
		if (document.getElementById('stNoticeBox') == null) {
			this._generateNewMarkup(title, description);
		}
		else {
			var stNoticeDiv = document.getElementById('stNoticeBox'),
				titleDiv = document.getElementById('stNoticeTitle'),
				descriptionDiv = document.getElementById('stNoticeDescription');
			titleDiv.innerHTML = title;
			descriptionDiv.innerHTML = description;
			stNoticeDiv.className += ' open';
		}
	},
	dismiss : function () {
		var stNoticeDiv = document.getElementById('stNoticeBox');
		if (stNoticeDiv != null) {
			stNoticeDiv.className = 'stNotice';
		}
	},
	_generateNewMarkup : function(title, description) {
		var noticeDiv = document.createElement('div');
		noticeDiv.setAttribute('tabindex', '0');
		noticeDiv.setAttribute('aria-label', 'Notice box');
		noticeDiv.id = 'stNoticeBox';
		noticeDiv.className = 'stNotice open';
		var titleDiv = document.createElement('div');
		titleDiv.setAttribute('tabindex', '0');
		titleDiv.id = 'stNoticeTitle';
		titleDiv.className = 'stNoticeTitle';
		titleDiv.innerHTML = title;
		noticeDiv.appendChild(titleDiv);
		var descriptionDiv = document.createElement('div');
		descriptionDiv.setAttribute('tabindex', '0');
		descriptionDiv.id = 'stNoticeDescription';
		descriptionDiv.className = 'stNoticeDescription';
		descriptionDiv.innerHTML = description;
		noticeDiv.appendChild(descriptionDiv);
		var noticeClose = document.createElement('a');
		noticeClose.setAttribute('aria-label', 'close');
		noticeClose.href = 'javascript:void(0);';
		noticeClose.className = 'stNoticeClose';
		noticeClose.onclick = function() { stNotice.dismiss(); };
		noticeClose.title = 'Close notice box';
		noticeDiv.appendChild(noticeClose);
		var noticeCloseSymbol = document.createElement('span');
		noticeCloseSymbol.setAttribute('aria-hidden', 'true');
		noticeCloseSymbol.innerHTML = '&times;';
		noticeClose.appendChild(noticeCloseSymbol);

		document.body.appendChild(noticeDiv);
	}

};
