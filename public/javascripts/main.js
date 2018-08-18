$(document).ready(function() {

	$('.report').click(function() {
  	let id = this.id
  	$.ajax({
  		url: '/thread/' + id,
  		type: 'PUT',
  		data: {
  			id: id
  		},
  		success: function(result) {
  			$.confirm({
  				title: 'The thread was reported!!',
  				content: result,
  				type: 'green',
  				typeAnimated: true,
  				buttons: {
  					ok: {
  						text: 'OK',
  						btnClass: 'btn-green',
  						action: function() {
  							document.location.href = '/threads'
  						}
  					}
  				}
  			})
  		},
  		error: function() {
  		$.alert({
  				title: 'Somthing went wrong!',
  				content: 'The thread was not reported.',
  				type: 'red'
  			})
  		}
  	})
	})

	$('.delete-thread').click(function(e) {
		e.preventDefault()
  	$.ajax({
  		url: '/thread/' + this.form.id,
  		type: 'DELETE',
  		data: $(this.form).serialize(),
  		success: function(result) {
  		$.confirm({
  				title: 'The thread was deleted!',
  				content: result,
  				type: 'green',
  				typeAnimated: true,
  				buttons: {
  					ok: {
  						text: 'OK',
  						btnClass: 'btn-green',
  						action: function() {
  							document.location.href = '/threads'
  						}
  					}
  				}
  			})
  		},
  		error: function() {
  		$.alert({
  				title: 'Wrong password!',
  				content: 'Try again please.',
  				type: 'red'
  			})
  		}
  	})
	})


})
