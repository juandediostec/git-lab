window.onload = function () {
    // 1. Mostrar posición del mouse
    document.addEventListener('mousemove', (e) => {
        const mousePos = document.getElementById('mousePosition');
        if (mousePos) {
            mousePos.textContent = `Posición del mouse: X: ${e.clientX}, Y: ${e.clientY}`;
        }
    });

    // 2. Mostrar nombre completo
    const form1 = document.getElementById('form1');
    if (form1) {
        form1.addEventListener('submit', (e) => {
            e.preventDefault();
            const fname = document.getElementById('form-fname').value;
            const lname = document.getElementById('form-lname').value;
            const fullName = `${fname} ${lname}`;
            let existing = document.getElementById('nombre-completo');
            if (!existing) {
                const p = document.createElement('p');
                p.id = 'nombre-completo';
                p.textContent = `Nombre completo: ${fullName}`;
                document.getElementById('form1-submit').after(p);
            } else {
                existing.textContent = `Nombre completo: ${fullName}`;
            }
        });
    }

    // 3. Insertar fila
    const btnRow = document.getElementById('btn-insert-r');
    if (btnRow) {
        btnRow.addEventListener('click', () => {
            const table = document.getElementById('sampleTable');
            const row = table.insertRow();
            const cells = table.rows[0].cells.length;
            for (let i = 0; i < cells; i++) {
                const cell = row.insertCell(i);
                cell.textContent = `Row ${table.rows.length} column ${i + 1}`;
            }
        });
    }

    // 3. Insertar columna
    const btnCol = document.getElementById('btn-insert-c');
    if (btnCol) {
        btnCol.addEventListener('click', () => {
            const table = document.getElementById('sampleTable');
            for (let i = 0; i < table.rows.length; i++) {
                const row = table.rows[i];
                const cell = row.insertCell(-1);
                cell.textContent = `Row ${i + 1} column ${row.cells.length}`;
            }
        });
    }

    // 4. Cambiar contenido de celda
    const btnChange = document.getElementById('btn-change');
    if (btnChange) {
        btnChange.addEventListener('click', () => {
            const row = parseInt(document.getElementById('rowIndex').value) - 1;
            const col = parseInt(document.getElementById('colIndex').value) - 1;
            const value = document.getElementById('newValue').value;
            const table = document.getElementById('myTable');
            if (table.rows[row] && table.rows[row].cells[col]) {
                table.rows[row].cells[col].textContent = value;
            } else {
                alert('Posición inválida.');
            }
        });
    }

    // 5. Agregar/quitar color
    const btnAddColor = document.getElementById('btn-add-color');
    const btnRemoveColor = document.getElementById('btn-rmv-color');
    const select = document.getElementById('colorSelect');
    const colorNames = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Pink', 'Orange', 'Brown', 'Gray', 'Cyan', 'Magenta', 'Teal', 'Navy', 'Salmon', 'Lime'];

    if (btnAddColor && select) {
        btnAddColor.addEventListener('click', () => {
            const randomColor = colorNames[Math.floor(Math.random() * colorNames.length)];
            const option = document.createElement('option');
            option.textContent = randomColor;
            option.value = randomColor.toLowerCase();
            select.appendChild(option);
        });
    }

    if (btnRemoveColor && select) {
        btnRemoveColor.addEventListener('click', () => {
            if (select.options.length > 0) {
                select.remove(select.selectedIndex);
            }
        });
    }

    // 6. Cambiar imagen con tamaño aleatorio al hacer hover
    document.getElementById("imagenGato").addEventListener("mouseenter", function () {
    const width = Math.floor(Math.random() * 301) + 300;
    const height = Math.floor(Math.random() * 301) + 300;
    this.src = `https://picsum.photos/${width}/${height}?random=${Date.now()}`;
    });
};