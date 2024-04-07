const colors = ["red", "blue", "green", "cyan", "magenta", "yellow", "black", "white", "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "blanchedalmond", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];


class SearchSelect {
    constructor(options) {
        this.searchBox = document.getElementById(options.searchBoxId);
        this.searchResults = document.getElementById(options.searchResultsId);
        this.selectedItemsDivId = options.selectedItemsId;
        this.selectedItemsDiv = document.getElementById(options.selectedItemsId);
        this.options = Array.isArray(options.options) ? options.options : [];
        this.selectedOptions = [];
        this.currentIndex = -1; // Índice da opção atualmente selecionada com teclado

        this.attachEventListeners();
    }
    
    updateSearchResults(forceDisplay = false) {
        const searchTerm = this.searchBox.value.toLowerCase();
        const filteredOptions = this.options.filter(option => option.includes(searchTerm));
        
        this.searchResults.innerHTML = '';
        this.currentIndex = -1;
        
        filteredOptions.forEach((option) => {
            const optionElement = document.createElement("div");
            optionElement.textContent = option;
            optionElement.classList.add("search-option");
            optionElement.onclick = () => {
                this.selectOption(option);
                this.clearSearch();
            };
            this.searchResults.appendChild(optionElement);
        });
    
        if (forceDisplay || this.searchBox === document.activeElement) {
            this.searchResults.style.display = 'block';
        }
    }
    

    attachEventListeners() {
        this.searchBox.addEventListener("input", () => {
            this.updateSearchResults(true);
        });

        this.searchBox.addEventListener("keydown", event => {
            const options = Array.from(this.searchResults.getElementsByClassName("search-option"));
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault(); // Impede o scroll da página
                if (event.key === "ArrowDown") {
                    this.currentIndex = (this.currentIndex + 1) % options.length;
                } else {
                    this.currentIndex = (this.currentIndex - 1 + options.length) % options.length;
                }
                this.highlightOption(this.currentIndex, options);
            } else if (event.key === "Enter" && this.currentIndex >= 0) {
                event.preventDefault();
                options[this.currentIndex].click(); // Simula um clique na opção
            } else if (event.key === "Escape") {
                this.searchBox.blur();
                this.clearSearch();
            }
        });

        this.searchBox.addEventListener("blur", () => {
            setTimeout(() => {
                this.searchResults.style.display = 'none';
            }, 200);
        });

        this.searchBox.addEventListener("focus", () => {
            if (this.searchBox.value) {
                this.updateSearchResults(true);
            }
        });
    }

    highlightOption(index, options) {
        options.forEach(option => option.classList.remove('highlighted'));
        options[index].classList.add('highlighted');
        options[index].scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    selectOption(option) {
        throw new Error("selectOption method should be implemented by subclasses");
    }

    updateSelectedItems() {
        throw new Error("updateSelectedItems method should be implemented by subclasses");
    }

    clearSearch() {
        this.searchBox.value = '';
        this.searchResults.innerHTML = '';
        this.searchResults.style.display = 'none';
        this.currentIndex = -1;
    }
}

class ColorSearchSelect extends SearchSelect {
    constructor(options) {
        super(options); // Chamando o construtor da classe base
        this.onColorSelectionChange = options.onColorSelectionChange;
    }

    selectOption(color) {
        if (!this.selectedOptions.includes(color)) {
            this.selectedOptions.push(color);
            this.updateSelectedItems();
            this.notifyColorChange(); // Notifica a mudança
        }
    }

    updateSelectedItems() {
        this.selectedItemsDiv = document.getElementById(this.selectedItemsDivId);

        if (this.selectedItemsDiv && this.selectedOptions.length > 0) {
            // Aplica flex diretamente, sobrescrevendo estilos CSS prévios
            this.selectedItemsDiv.style.display = 'flex';
        } else if (this.selectedItemsDiv) {
            this.selectedItemsDiv.style.display = 'none';
        }
    
        this.selectedItemsDiv.innerHTML = '';
        this.selectedOptions.forEach(color => {
            const colorBox = document.createElement("div");
            colorBox.classList.add("color-box");
            colorBox.style.backgroundColor = color;
            
            const removeButton = document.createElement("div");
            removeButton.textContent = "x";
            removeButton.classList.add("remove-color");
            removeButton.onclick = () => {
                const index = this.selectedOptions.indexOf(color);
                if (index > -1) {
                    this.selectedOptions.splice(index, 1);
                    this.updateSelectedItems(); // Atualiza a visualização após a remoção
                }
            };
            colorBox.appendChild(removeButton);
            this.selectedItemsDiv.appendChild(colorBox);
        });
    }

    removeSelectedColor(color) {
        const index = this.selectedOptions.indexOf(color);
        if (index > -1) {
            this.selectedOptions.splice(index, 1);
            this.updateSelectedItems();
            this.notifyColorChange(); // Notifica a mudança
        }

        if (this.selectedOptions.length === 0) {
            this.selectedItemsDiv.style.display = 'none';
        }
    }

    notifyColorChange() {
        // Chama o callback de notificação de mudança de seleção, se definido.
        if (this.onColorSelectionChange) {
            this.onColorSelectionChange(this.selectedOptions);
        }
    }
    
}

class CitySelectPared extends SearchSelect {
    constructor(options) {
        super(options);
        this.cityOptions = Array.isArray(options.cityOptions) ? options.cityOptions : [];
        this.selectedCity = null;
    }

    attachEventListeners() {
        super.attachEventListeners(); // Chama o método da classe base para eventos comuns

        this.searchBox.addEventListener('input', () => {
            this.updateSearchResults();
        });
    }

    updateSearchResults() {
        const searchTerm = this.searchBox.value.toLowerCase();
        const filteredCities = this.cityOptions.filter(city => city.toLowerCase().includes(searchTerm));

        this.searchResults.innerHTML = ''; // Limpa os resultados anteriores
        filteredCities.forEach(city => {
            const optionElement = document.createElement("div");
            optionElement.textContent = city;
            optionElement.classList.add("search-option");
            optionElement.addEventListener('click', () => this.selectCity(city));
            this.searchResults.appendChild(optionElement);
        });

        this.searchResults.style.display = filteredCities.length ? 'block' : 'none';
    }

    selectCity(city) {
        this.selectedCity = city;
        this.updateDisplayBox();
        this.clearSearch(); // Limpa a busca e esconde os resultados após a seleção
    }

    ensureDisplayExists() {
        this.selectedItemsDiv = document.getElementById(this.selectedItemsDivId);
        
        if (!this.selectedItemsDiv) {
            this.selectedItemsDiv = this.createDisplayBox();
        }
    }

    updateDisplayBox() {
        this.ensureDisplayExists()
        const displayBox = this.selectedItemsDiv || this.createDisplayBox(); // Usando o ID fornecido no construtor
        if (!displayBox) {
            displayBox = document.createElement('div');
            displayBox.id = this.selectedItemsDivId;
            document.body.appendChild(displayBox); // Adiciona ao body ou a um contêiner específico, conforme necessário
        }

        displayBox.textContent = this.selectedCity; // Atualiza o texto para a cidade selecionada
    }

    createDisplayBox() {
        const box = document.createElement('div');
        const parentBox = document.getElementById('resultsRest')

        console.log('Daniel Log - CitySelectPared - createDisplayBox - selectedItemsDivId:', this.selectedItemsDivId);
        box.id = this.selectedItemsDivId; // Usando o ID fornecido no construtor
        parentBox.appendChild(box);
        return box;
    }

    clearSearch() {
        super.clearSearch(); // Chama a implementação da classe base para limpar a busca
    }
}

class ColorSelectPared extends SearchSelect {
    constructor(options) {
        super(options);
        this.colorOptions = Array.isArray(options.colorOptions) ? options.colorOptions : []; // Corrigido para colorOptions
        this.selectedColor = null;
        
    }

    attachEventListeners() {
        super.attachEventListeners(); // Chama o método da classe base para eventos comuns

        this.searchBox.addEventListener('input', () => {
            this.updateSearchResults();
        });
    }

    updateSearchResults() {
        const searchTerm = this.searchBox.value.toLowerCase();
        const filteredCities = this.colorOptions.filter(city => city.toLowerCase().includes(searchTerm));

        this.searchResults.innerHTML = ''; // Limpa os resultados anteriores
        filteredCities.forEach(city => {
            const optionElement = document.createElement("div");
            optionElement.textContent = city;
            optionElement.classList.add("search-option");
            optionElement.addEventListener('click', () => this.selectedColorFromSearch(city));
            this.searchResults.appendChild(optionElement);
        });

        this.searchResults.style.display = filteredCities.length ? 'block' : 'none';
    }

    selectedColorFromSearch(color) {
        this.selectedColor = color;
        this.updateDisplayBox();
        this.clearSearch(); // Limpa a busca e esconde os resultados após a seleção
    }

    ensureDisplayExists() {
        this.selectedItemsDiv = document.getElementById(this.selectedItemsDivId);
        
        if (!this.selectedItemsDiv) {
            this.selectedItemsDiv = this.createDisplayBox();
        }
    }
    

    updateDisplayBox() {
        this.ensureDisplayExists()
        const displayBox = this.selectedItemsDiv || this.createDisplayBox(); // Usando o ID fornecido no construtor

        if (this.selectedColor) {
            displayBox.style.backgroundColor = this.selectedColor;
        } else {
            displayBox.style.backgroundColor = 'transparent';
        }
    }


    createDisplayBox() {
        const box = document.createElement('div');
        const parentBox = document.getElementById('resultsRest')

        console.log('Daniel Log - CitySelectPared - createDisplayBox - selectedItemsDivId:', this.selectedItemsDivId);
        box.id = this.selectedItemsDivId; // Usando o ID fornecido no construtor
        parentBox.appendChild(box);
        return box;
    }

    clearSearch() {
        super.clearSearch(); // Chama a implementação da classe base para limpar a busca
    }
}


map_aus = ['WA', 'NT', 'SA', 'Q', 'NSW', 'V', 'T']


function initializeColorSearchSelect() {
    return new Promise((resolve, reject) => {
        const colorSearchSelect = new ColorSearchSelect({
            searchBoxId: "searchBox",
            searchResultsId: "searchResults",
            selectedItemsId: "selectedColors",
            options: colors
        });
        resolve(colorSearchSelect);
    });
}

function initializeColorSelectPared(colorSearchSelect) {
    return new Promise((resolve, reject) => {
        const colorSelectPared = new ColorSelectPared({
            searchBoxId: 'selectedColorsSearchBox',
            searchResultsId: 'selectedColorsSearchResults',
            selectedItemsId: 'cityColorDisplayBox',
            // displayBox: 'cityColorDisplayBox',
            colorOptions: colorSearchSelect.selectedOptions
        });

        // Atualiza as opções do ColorSelectPared com base nas seleções do ColorSearchSelect
        colorSearchSelect.onColorSelectionChange = selectedColors => {
            colorSelectPared.options = selectedColors;

        };

        resolve(colorSelectPared);
    });
}

function initializeCitySelectPared() {
    return new Promise((resolve, reject) => {
        const citySelectPared = new CitySelectPared({
            searchBoxId: 'citySearchBox',
            searchResultsId: 'citySearchResults',
            selectedItemsId: 'cityColorDisplayBox',
            cityOptions: map_aus,
            // displayBox: 'cityColorDisplayBox'
        });
        resolve(citySelectPared);
    });
}


document.addEventListener('DOMContentLoaded', async function() {
    try {
        const colorSearchSelect = await initializeColorSearchSelect();
        await initializeColorSelectPared(colorSearchSelect); // Agora espera pela inicialização do ColorSelectPared
        const citySelectPared = await initializeCitySelectPared(); // Inicializa o CitySelectPared
        
        // As instâncias estão agora inicializadas e sincronizadas.
    } catch (error) {
        console.error("Erro durante a inicialização:", error);
    }
});


let restrictionsJSON = []; // Inicializa o armazenamento JSON

function applyRestrictions() {
    const resultsRest = document.getElementById('resultsRest').children;

    Array.from(resultsRest).forEach((rest) => {
        const bgColor = window.getComputedStyle(rest).backgroundColor;
        const textContent = rest.textContent.trim();

        // Verifica se já existe uma restrição com o mesmo textContent
        const textContentExists = restrictionsJSON.some(restriction => restriction.textContent === textContent);

        if (!textContentExists && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && textContent) {
            // Processo de clonagem e adição se a restrição passa pelas verificações
            const clone = rest.cloneNode(true);
            clone.style.position = 'relative';

            const removeBtn = document.createElement("span");
            removeBtn.innerHTML = "&times;";
            removeBtn.classList.add("remove-restriction");
            removeBtn.onclick = function() {
                clone.remove();
                updateRestsVisibility();
                const index = restrictionsJSON.findIndex(restriction => restriction.textContent === textContent);
                if (index !== -1) restrictionsJSON.splice(index, 1);
            };
            
            clone.appendChild(removeBtn);
            document.getElementById('appliedRests').appendChild(clone);

            restrictionsJSON.push({ textContent: textContent, backgroundColor: bgColor });
            updateRestsVisibility();
        }
    });
}






function updateRestsVisibility() {
    const restsContainer = document.getElementById('rests');
    const appliedRests = document.getElementById('appliedRests');
    
    // Verifica se existem restrições aplicadas (filhos dentro de #appliedRests)
    if (appliedRests.children.length > 0) {
        restsContainer.style.display = 'flex'; // Mostra #rests
    } else {
        restsContainer.style.display = 'none'; // Esconde #rests se não houver restrições
    }
}



// Função para salvar o JSON atualizado em armazenamento local ou enviar para um servidor
function saveRestrictions() {
    localStorage.setItem('restrictions', JSON.stringify(restrictionsJSON));
    // Ou use fetch/axios para enviar restrictionsJSON para um backend
}

// Função para carregar restrições do armazenamento local (chame isso ao carregar a página, se necessário)
function loadRestrictions() {
    const storedRestrictions = localStorage.getItem('restrictions');
    if (storedRestrictions) {
        restrictionsJSON = JSON.parse(storedRestrictions);
        // Aqui você poderia recriar os elementos no DOM com base no JSON carregado, se necessário
    }
}
