$('.wiki-random').click(function() {
	window.open("https://en.wikipedia.org/wiki/Special:Random");
});
function searchToggle(obj,evt) {
	var container = $(obj).closest('.search-wrapper');
	if(!container.hasClass('active')) {
		container.addClass('active');
		evt.preventDefault();
	}
	else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
		container.removeClass('active');
		// clear input
		container.find('.search-input').val('');
		// clear and hide result container when we press close
		container.find('.result-container').fadeOut(100, function(){
			$(this).empty();});
	}
}
function wikiPosition() {
		$('.wiki').addClass('wiki-enter').removeClass('wiki');
}
function wikiSearch() {
	$.ajax({
		url:"https://en.wikipedia.org/w/api.php?",
		dataType: "jsonp",
		data: {
			'action': "opensearch",
			'format': "json",
			 'search': $('.search-input').val()
		},
		success: function(data) {
			var html = "";
			var str = "";
			for (i=0;i<data[1].length;i++) {
				str = "<div class='entry well'><a href="+
					data[3][i]+"><h3>"+data[1][i]+
					"</h3><p>"+data[2][i]+"</p></a></div>";
				html = html+str;
			}
			$('.content').html(html);
		}
	});
}
function submitFn(obj, evt) {
	value = $(obj).find('.search-input').val().trim();
	wikiPosition();
	wikiSearch();
	$('h3').hide();
	
	evt.preventDefault();
}

