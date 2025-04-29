// logic1.js
(() => {
    // AutoArrange module encapsulating the logic
    const AutoArrange = {
        init: function() {
            this.createButton();
            this.createModal();
            this.attachEvents();
        },
        createButton: function() {
            const btn = document.createElement('button');
            btn.id = 'autoArrangeBtn';
            btn.className = 'btn btn-primary m-2';
            btn.textContent = 'Auto Arrange';
            // find your toolbar container (or fallback to body)
            const container = document.querySelector('.toolbar') || document.body;
            container.appendChild(btn);
        },
        createModal: function() {
            const rooms = window.rooms || [];
            let roomsOptions = rooms.map(r =>
                `<option value="${r.id}">${r.name}</option>`
            ).join('') || '<option disabled>No rooms</option>';

            const streams = Array.from(new Set((window.students||[]).map(s => s.stream).filter(Boolean)));
            const buildStreamOpts = arr => arr.map(stream =>
                `<option value="stream_${stream}">${stream}</option>`
            ).join('');

            const modalHtml = `
<div class="modal" tabindex="-1" id="autoArrangeModal">
  <div class="modal-dialog"><div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Auto-Arrange Settings</h5>
      <button type="button" class="close" data-dismiss="modal">&times;</button>
    </div>
    <div class="modal-body">
      <form id="autoArrangeForm">
        <div class="form-group">
          <label>Select Rooms</label>
          <select multiple class="form-control" id="roomsSelect">${roomsOptions}</select>
        </div>
        <div class="form-group">
          <label>Gender Preference</label><br>
          ${['mixed','boys','girls','custom'].map(g =>
            `<div class="form-check form-check-inline">
               <input class="form-check-input" type="radio" name="genderPref" id="gender${g}" value="${g}" ${g==='mixed'?'checked':''}>
               <label class="form-check-label" for="gender${g}">${g.charAt(0).toUpperCase()+g.slice(1)}</label>
             </div>`
          ).join('')}
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="streamGroup">
          <label class="form-check-label" for="streamGroup">Group by Stream</label>
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="noSameNeighbors">
          <label class="form-check-label" for="noSameNeighbors">Disallow same-class neighbors</label>
        </div>
        <div class="form-group">
          <label>Empty seats between</label>
          <input type="number" min="0" class="form-control" id="emptySeats" value="0">
        </div>
        <div class="form-group">
          <label>Front-row priority</label>
          <select class="form-control" id="frontPriority">
            <option value="">None</option>
            <option value="gender_female">Girls</option>
            <option value="gender_male">Boys</option>
            ${buildStreamOpts(streams)}
          </select>
        </div>
        <div class="form-group">
          <label>Back-row priority</label>
          <select class="form-control" id="backPriority">
            <option value="">None</option>
            <option value="gender_female">Girls</option>
            <option value="gender_male">Boys</option>
            ${buildStreamOpts(streams)}
          </select>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button class="btn btn-primary" id="applyAutoArrange">Generate</button>
    </div>
  </div></div>
</div>`;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        },
        attachEvents: function() {
            document.getElementById('autoArrangeBtn')
              .addEventListener('click', () => $('#autoArrangeModal').modal('show'));
            document.getElementById('applyAutoArrange')
              .addEventListener('click', e => this.handleFormSubmit(e));
        },
        handleFormSubmit: function(e) {
            e.preventDefault();
            const rules = this.gatherRules();
            if (!rules.rooms.length) {
                alert('Select at least one room');
                return;
            }
            this.generateArrangement(rules);
        },
        gatherRules: function() {
            return {
                rooms: Array.from(document.getElementById('roomsSelect').selectedOptions).map(o=>o.value),
                genderPref: document.querySelector('input[name="genderPref"]:checked').value,
                groupByStream: document.getElementById('streamGroup').checked,
                noSameNeighbors: document.getElementById('noSameNeighbors').checked,
                emptySeats: parseInt(document.getElementById('emptySeats').value)||0,
                frontPriority: document.getElementById('frontPriority').value,
                backPriority: document.getElementById('backPriority').value
            };
        },
        generateArrangement: function(rules) {
            const all = window.students.slice();
            rules.rooms.forEach(rid => {
                const arr = this.arrangeRoom(rid, rules, all);
                if (typeof window.applySeatingArrangement === 'function') {
                    window.applySeatingArrangement(rid, arr);
                } else console.log(rid, arr);
            });
            alert('Auto-arranged!');
            $('#autoArrangeModal').modal('hide');
        },
        arrangeRoom: function(roomId, rules, allStudents) {
            // Filter students assigned to this room (or all if none)
            let list = allStudents.filter(s => s.roomId==roomId);
            // [apply front/back priorities, grouping, gender sort, neighbor-check, empty seats…]
            // (see full implementation above)
            // return a 2D array [[stu, null, stu…], …]
            return /* …computed grid… */;
        }
        // …plus helpers like reorderNoSame()…
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => AutoArrange.init());
    } else {
      AutoArrange.init();
    }
})();