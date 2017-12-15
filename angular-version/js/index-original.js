$(document).ready(function(){
  // Binding file input to the prettier button:
  $('#upload-file').on('click', function(){
    $('#upload-input').click();
  });
  // Binding ADD button
  $('#add-new').click(function(){
    // Take new values
    var newName = $('input[name=newName]').val();
    var newEmail = $('input[name=newEmail]').val();
    // Format HTML row
    var html = '<tr class="last-added data-row pending"><td>' + newName + '</td><td>' + newEmail + '</td><td></td></tr>';
    // Empty text boxes:
    $('input[name=newName]').val("");
    $('input[name=newEmail]').val("");
    // Display new row:
    $(html).insertBefore("#new-row").hide();
    $('.last-added').slideDown("slow");
    $('.last-added').toggleClass('last-added');
    // Update Status information
    updateStatus();
  });
  // Double-click to delete row
  $('body').on('dblclick', '.data-row', function(){
    $(this).fadeTo(500, 0.01, function(){
      $(this).slideUp(150, function() {
          $(this).remove();
          // Update Status information
          updateStatus();
      });
    });
  });
  // Clear button binding
  $('#clear-table').click(function() {
    var r = confirm('Are you sure you want to delete all items in the table?');
    if (r == true) {
      $('.review-table .data-row').remove();
      updateStatus();
    }
  });
  // Check room button binding
  $('#check-room').click(function() {
      roomName = $("input[name='room-name']").val();
      checkRoom(roomName);
  });
  // Run button binding
  $('#run-button').click(addPeople());
  //CSV multiple users:
  // Loading text file:
  $('#upload-input').on("change", function(evt){
    // Store file
    var csvFile = evt.target.files;
    // Read file:
    var reader = new FileReader();
    reader.onload = function(e) {
      var content = e.target.result;
      // Create rows:
      var rows = content.split('\n');
      var html = '';
      rows.forEach(function(currentRow){
        if (currentRow != '') {
          var columns = currentRow.split(',');
          html += '<tr class="pending data-row"><td>' + columns[0] + '</td><td>' + columns[1] + '</td><td></td></tr>';
        }
      });
      $(html).insertBefore("#new-row");
      // Update Status information
      updateStatus();
    };
    reader.readAsText(csvFile[0]);
  });
});

function updateStatus() {
  // Updates status information
  var nPending = $('.review-table .pending').length;
  var nCompleted = $('.review-table .completed').length;
  var nError = $('.review-table .error').length;
  $('.status').text('Total: ' + String(nPending) + ' pending users, ' + String(nCompleted) + ' users added, ' + String(nError) + ' errors.');
  // Clear all button display binding
  if ($('.review-table .data-row').length > 0) {
    $('#clear-table').show('slow');
    console.log('hola');
  } else {
    $('#clear-table').hide('slow');
  }
}

function checkRoom(roomName) {
  // Function to check that the room exists.
  // Parameters:
  // - roomName: The name of the room

}

function addPeople() {
  // Funtion to proceed to add the listed people to the desired room
  $("tr.pending").each(function(){
    //Take person email and name
    
  });

}
