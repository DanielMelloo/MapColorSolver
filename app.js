const colors = ["red", "blue", "green", "cyan", "magenta", "yellow", "black", "white", "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "blanchedalmond", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];

const map_aus = ['WA', 'NT', 'SA', 'Q', 'NSW', 'V', 'T']


let pyodideReady = false;
let pyodideRuntime;

let colorSearchSelect; 

let restrictionsJSON = []; 
  
let currentMessageIndex = 0;


function rgbToName(rgbString) {
    const colorsMap = {
        "rgb(255, 0, 0)": "red",
        "rgb(0, 0, 255)": "blue",
        "rgb(0, 128, 0)": "green",
        "rgb(0, 255, 255)": "cyan",
        "rgb(255, 0, 255)": "magenta",
        "rgb(255, 255, 0)": "yellow",
        "rgb(0, 0, 0)": "black",
        "rgb(255, 255, 255)": "white",
        "rgb(240, 248, 255)": "aliceblue",
        "rgb(250, 235, 215)": "antiquewhite",
        "rgb(0, 255, 255)": "aqua",
        "rgb(127, 255, 212)": "aquamarine",
        "rgb(240, 255, 255)": "azure",
        "rgb(245, 245, 220)": "beige",
        "rgb(255, 228, 196)": "bisque",
        "rgb(255, 235, 205)": "blanchedalmond",
        "rgb(138, 43, 226)": "blueviolet",
        "rgb(165, 42, 42)": "brown",
        "rgb(222, 184, 135)": "burlywood",
        "rgb(95, 158, 160)": "cadetblue",
        "rgb(127, 255, 0)": "chartreuse",
        "rgb(210, 105, 30)": "chocolate",
        "rgb(255, 127, 80)": "coral",
        "rgb(100, 149, 237)": "cornflowerblue",
        "rgb(255, 248, 220)": "cornsilk",
        "rgb(220, 20, 60)": "crimson",
        "rgb(0, 0, 139)": "darkblue",
        "rgb(0, 139, 139)": "darkcyan",
        "rgb(184, 134, 11)": "darkgoldenrod",
        "rgb(169, 169, 169)": "darkgray",
        "rgb(0, 100, 0)": "darkgreen",
        "rgb(189, 183, 107)": "darkkhaki",
        "rgb(139, 0, 139)": "darkmagenta",
        "rgb(85, 107, 47)": "darkolivegreen",
        "rgb(255, 140, 0)": "darkorange",
        "rgb(153, 50, 204)": "darkorchid",
        "rgb(139, 0, 0)": "darkred",
        "rgb(233, 150, 122)": "darksalmon",
        "rgb(143, 188, 143)": "darkseagreen",
        "rgb(72, 61, 139)": "darkslateblue",
        "rgb(47, 79, 79)": "darkslategray",
        "rgb(0, 206, 209)": "darkturquoise",
        "rgb(148, 0, 211)": "darkviolet",
        "rgb(255, 20, 147)": "deeppink",
        "rgb(0, 191, 255)": "deepskyblue",
        "rgb(105, 105, 105)": "dimgray",
        "rgb(30, 144, 255)": "dodgerblue",
        "rgb(178, 34, 34)": "firebrick",
        "rgb(255, 250, 240)": "floralwhite",
        "rgb(34, 139, 34)": "forestgreen",
        "rgb(255, 0, 255)": "fuchsia",
        "rgb(220, 220, 220)": "gainsboro",
        "rgb(248, 248, 255)": "ghostwhite",
        "rgb(255, 215, 0)": "gold",
        "rgb(218, 165, 32)": "goldenrod",
        "rgb(128, 128, 128)": "gray",
        "rgb(173, 255, 47)": "greenyellow",
        "rgb(240, 255, 240)": "honeydew",
        "rgb(255, 105, 180)": "hotpink",
        "rgb(205, 92, 92)": "indianred",
        "rgb(75, 0, 130)": "indigo",
        "rgb(255, 255, 240)": "ivory",
        "rgb(240, 230, 140)": "khaki",
        "rgb(230, 230, 250)": "lavender",
        "rgb(255, 240, 245)": "lavenderblush",
        "rgb(124, 252, 0)": "lawngreen",
        "rgb(255, 250, 205)": "lemonchiffon",
        "rgb(173, 216, 230)": "lightblue",
        "rgb(240, 128, 128)": "lightcoral",
        "rgb(224, 255, 255)": "lightcyan",
        "rgb(250, 250, 210)": "lightgoldenrodyellow",
        "rgb(211, 211, 211)": "lightgray",
        "rgb(144, 238, 144)": "lightgreen",
        "rgb(255, 182, 193)": "lightpink",
        "rgb(255, 160, 122)": "lightsalmon",
        "rgb(32, 178, 170)": "lightseagreen",
        "rgb(135, 206, 250)": "lightskyblue",
        "rgb(119, 136, 153)": "lightslategray",
        "rgb(176, 196, 222)": "lightsteelblue",
        "rgb(255, 255, 224)": "lightyellow",
        "rgb(0, 255, 0)": "lime",
        "rgb(50, 205, 50)": "limegreen",
        "rgb(250, 240, 230)": "linen",
        "rgb(255, 0, 255)": "magenta",
        "rgb(128, 0, 0)": "maroon",
        "rgb(102, 205, 170)": "mediumaquamarine",
        "rgb(0, 0, 205)": "mediumblue",
        "rgb(186, 85, 211)": "mediumorchid",
        "rgb(147, 112, 219)": "mediumpurple",
        "rgb(60, 179, 113)": "mediumseagreen",
        "rgb(123, 104, 238)": "mediumslateblue",
        "rgb(0, 250, 154)": "mediumspringgreen",
        "rgb(72, 209, 204)": "mediumturquoise",
        "rgb(199, 21, 133)": "mediumvioletred",
        "rgb(25, 25, 112)": "midnightblue",
        "rgb(245, 255, 250)": "mintcream",
        "rgb(255, 228, 225)": "mistyrose",
        "rgb(255, 228, 181)": "moccasin",
        "rgb(255, 222, 173)": "navajowhite",
        "rgb(0, 0, 128)": "navy",
        "rgb(253, 245, 230)": "oldlace",
        "rgb(128, 128, 0)": "olive",
        "rgb(107, 142, 35)": "olivedrab",
        "rgb(255, 165, 0)": "orange",
        "rgb(255, 69, 0)": "orangered",
        "rgb(218, 112, 214)": "orchid",
        "rgb(238, 232, 170)": "palegoldenrod",
        "rgb(152, 251, 152)": "palegreen",
        "rgb(175, 238, 238)": "paleturquoise",
        "rgb(219, 112, 147)": "palevioletred",
        "rgb(255, 239, 213)": "papayawhip",
        "rgb(255, 218, 185)": "peachpuff",
        "rgb(205, 133, 63)": "peru",
        "rgb(255, 192, 203)": "pink",
        "rgb(221, 160, 221)": "plum",
        "rgb(176, 224, 230)": "powderblue",
        "rgb(128, 0, 128)": "purple",
        "rgb(102, 51, 153)": "rebeccapurple",
        "rgb(188, 143, 143)": "rosybrown",
        "rgb(65, 105, 225)": "royalblue",
        "rgb(139, 69, 19)": "saddlebrown",
        "rgb(250, 128, 114)": "salmon",
        "rgb(244, 164, 96)": "sandybrown",
        "rgb(46, 139, 87)": "seagreen",
        "rgb(255, 245, 238)": "seashell",
        "rgb(160, 82, 45)": "sienna",
        "rgb(192, 192, 192)": "silver",
        "rgb(135, 206, 235)": "skyblue",
        "rgb(106, 90, 205)": "slateblue",
        "rgb(112, 128, 144)": "slategray",
        "rgb(255, 250, 250)": "snow",
        "rgb(0, 255, 127)": "springgreen",
        "rgb(70, 130, 180)": "steelblue",
        "rgb(210, 180, 140)": "tan",
        "rgb(0, 128, 128)": "teal",
        "rgb(216, 191, 216)": "thistle",
        "rgb(255, 99, 71)": "tomato",
        "rgb(64, 224, 208)": "turquoise",
        "rgb(238, 130, 238)": "violet",
        "rgb(245, 222, 179)": "wheat",
        "rgb(255, 255, 255)": "white",
        "rgb(245, 245, 245)": "whitesmoke",
        "rgb(255, 255, 0)": "yellow",
        "rgb(154, 205, 50)": "yellowgreen"
    };

    return colorsMap[rgbString] || "whitesmoke";

}


class SearchSelect {
    constructor(options) {
        this.searchBox = document.getElementById(options.searchBoxId);
        this.searchResults = document.getElementById(options.searchResultsId);
        this.selectedItemsDivId = options.selectedItemsId;
        this.selectedItemsDiv = document.getElementById(options.selectedItemsId);
        this.options = Array.isArray(options.options) ? options.options : [];
        this.selectedOptions = [];
        this.currentIndex = -1; 

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
                event.preventDefault(); 
                if (event.key === "ArrowDown") {
                    this.currentIndex = (this.currentIndex + 1) % options.length;
                } else {
                    this.currentIndex = (this.currentIndex - 1 + options.length) % options.length;
                }
                this.highlightOption(this.currentIndex, options);
            } else if (event.key === "Enter" && this.currentIndex >= 0) {
                event.preventDefault();
                options[this.currentIndex].click(); 
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
        super(options); 
        this.onColorSelectionChange = options.onColorSelectionChange;
    }

    selectOption(color) {
        if (!this.selectedOptions.includes(color)) {
            this.selectedOptions.push(color);
            this.updateSelectedItems();
            this.notifyColorChange(); 
        }
    }

    updateSelectedItems() {
        this.selectedItemsDiv = document.getElementById(this.selectedItemsDivId);

        if (this.selectedItemsDiv && this.selectedOptions.length > 0) {
            
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
                    this.updateSelectedItems(); 
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
            this.notifyColorChange(); 
        }

        if (this.selectedOptions.length === 0) {
            this.selectedItemsDiv.style.display = 'none';
        }
    }

    notifyColorChange() {
        
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
        super.attachEventListeners(); 

        this.searchBox.addEventListener('input', () => {
            this.updateSearchResults();
        });
    }

    updateSearchResults() {
        const searchTerm = this.searchBox.value.toLowerCase();
        const filteredCities = this.cityOptions.filter(city => city.toLowerCase().includes(searchTerm));

        this.searchResults.innerHTML = ''; 
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
        this.clearSearch(); 
    }

    ensureDisplayExists() {
        this.selectedItemsDiv = document.getElementById(this.selectedItemsDivId);
        
        if (!this.selectedItemsDiv) {
            this.selectedItemsDiv = this.createDisplayBox();
        }
    }

    updateDisplayBox() {
        this.ensureDisplayExists()
        const displayBox = this.selectedItemsDiv || this.createDisplayBox(); 
        if (!displayBox) {
            displayBox = document.createElement('div');
            displayBox.id = this.selectedItemsDivId;
            document.body.appendChild(displayBox); 
        }

        displayBox.textContent = this.selectedCity; 
    }

    createDisplayBox() {
        const box = document.createElement('div');
        const parentBox = document.getElementById('resultsRest')

        console.log('Daniel Log - CitySelectPared - createDisplayBox - selectedItemsDivId:', this.selectedItemsDivId);
        box.id = this.selectedItemsDivId; 
        parentBox.appendChild(box);
        return box;
    }

    clearSearch() {
        super.clearSearch(); 
    }
}

class ColorSelectPared extends SearchSelect {
    constructor(options) {
        super(options);
        this.colorOptions = Array.isArray(options.colorOptions) ? options.colorOptions : []; 
        this.selectedColor = null;
        
    }

    attachEventListeners() {
        super.attachEventListeners(); 

        this.searchBox.addEventListener('input', () => {
            this.updateSearchResults();
        });
    }

    updateSearchResults() {
        const searchTerm = this.searchBox.value.toLowerCase();
        const filteredCities = this.colorOptions.filter(city => city.toLowerCase().includes(searchTerm));

        this.searchResults.innerHTML = ''; 
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
        this.clearSearch(); 
    }

    ensureDisplayExists() {
        this.selectedItemsDiv = document.getElementById(this.selectedItemsDivId);
        
        if (!this.selectedItemsDiv) {
            this.selectedItemsDiv = this.createDisplayBox();
        }
    }
    

    updateDisplayBox() {
        this.ensureDisplayExists()
        const displayBox = this.selectedItemsDiv || this.createDisplayBox(); 

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
        box.id = this.selectedItemsDivId; 
        parentBox.appendChild(box);
        return box;
    }

    clearSearch() {
        super.clearSearch(); 
    }
}





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
            
            colorOptions: colorSearchSelect.selectedOptions
        });

        
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
            
        });
        resolve(citySelectPared);
    });
}


document.addEventListener('DOMContentLoaded', async function() {
    try {
        colorSearchSelect = await initializeColorSearchSelect();
        const colorSelectPared = await initializeColorSelectPared(colorSearchSelect);
        const citySelectPared = await initializeCitySelectPared();
        

        setupPrintButton(); 
    } catch (error) {
        console.error("Erro durante a inicialização:", error);
    }
});


function applyRestrictions() {
    const resultsRest = document.getElementById('resultsRest').children;

    Array.from(resultsRest).forEach((rest) => {
        const bgColor = window.getComputedStyle(rest).backgroundColor;
        const textContent = rest.textContent.trim();

        
        const textContentExists = restrictionsJSON.some(restriction => restriction.textContent === textContent);

        if (!textContentExists && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && textContent) {
            
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

            let test = { textContent: textContent, backgroundColor: rgbToName(bgColor) }
            restrictionsJSON.push(test);
            updateRestsVisibility();
        }
    });
}






function updateRestsVisibility() {
    const restsContainer = document.getElementById('rests');
    const appliedRests = document.getElementById('appliedRests');
    
    
    if (appliedRests.children.length > 0) {
        restsContainer.style.display = 'flex'; 
    } else {
        restsContainer.style.display = 'none'; 
    }
}



const loadingMessages = [
    "Carregando Soluções...",
    "Por Favor Aguarde...",
    "Processando cores...",
    "Processando Soluções...",
    "Vértices?...",
    "Grafos?..."
];
  
function updateLoadingMessage() {
    const loadingMessageElement = document.getElementById('loadingMessage');
    loadingMessageElement.textContent = loadingMessages[currentMessageIndex];
    
    
    currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
}

function startMessageAnimation() {
    
    updateLoadingMessage(); 
    setInterval(updateLoadingMessage, 2000);
}


async function showLoading() {
    document.getElementById('loadingElement').style.display = 'flex';
    document.querySelector('main').style.display = 'none'; 
    startMessageAnimation(); 
    await runPythonCode();
    console.log('oidas')

}
  
function hideLoading() {
        document.getElementById('loadingElement').style.display = 'none';
}
  








async function loadPyodideAndPackages() {
  if (!pyodideReady) {
    pyodideRuntime = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
    });
    console.log("Pyodide carregado com sucesso.");
    await pyodideRuntime.loadPackage("matplotlib");
    await pyodideRuntime.loadPackage("numpy");
    await pyodideRuntime.loadPackage("networkx");
    pyodideReady = true;
  }
}



const pkg = `
# ====== #
# Visual #
# ====== #

def ne(a, b):
    "Same as a != b."
    return a != b

class Visualizavel(object):

    max_nivel_visual = 1

    def visual(self, nivel, *args, **nargs):

        if nivel <= self.max_nivel_visual:
            print(*args, **nargs)

def visualize(func):
    return func


# ================= #
# Problema de Busca #
# ================= #


class Busca_problema(object):

    def no_de_inicio(self):
        raise NotImplementedError("no_de_inicio")

    def eh_objetivo(self, no):
        raise NotImplementedError("eh_objetivo")

    def vizin(self, no):
        raise NotImplementedError("vizin")

    def heuristica(self, n):
        return 0


class arco(object):
    def __init__(self, partida_no, chegada_no, custo=1, acao=None):
        assert custo >= 0, ("Custo nao pode ser negativo " +
                            str(partida_no) + "->" + str(chegada_no) + ", custo: " + str(custo))
        self.partida_no = partida_no
        self.chegada_no = chegada_no
        self.acao = acao
        self.custo = custo

    def __repr__(self):
        if self.acao:
            return str(self.partida_no) + " --" + str(self.acao) + "--> " + str(self.chegada_no)
        else:
            return str(self.partida_no) + " --> " + str(self.chegada_no)


class Problema_busca_com_grafo_explicito(Busca_problema):
    def __init__(self, nos, arcos, inicio=None, objetivos=set(), hmap={}, posicoes={}):
        self.vizinhos = {}
        self.nos = nos
        for no in nos:
            self.vizinhos[no] = []
        self.arcos = arcos
        for arco in arcos:
            self.vizinhos[arco.partida_no].append(arco)
        self.inicio = inicio
        self.objetivos = objetivos
        self.hmap = hmap
        self.posicoes = posicoes

    def no_de_inicio(self):
        return self.inicio

    def eh_objetivo(self, no):
        return no in self.objetivos

    def vizin(self, no):
        return self.vizinhos[no]

    def heuristic(self, no):
        if no in self.hmap:
            return self.hmap[no]
        else:
            return 0

    def __repr__(self):
        res = ""
        for arco in self.arcos:
            res += str(arco) + ".  "
        return res

    def nos_vizinhos(self, no):
        return (caminho.chegada_no for caminho in self.vizinhos[no])


class Caminho(object):

    def __init__(self, inicio, arco=None):
        self.inicio = inicio
        self.arco = arco
        if arco is None:
            self.custo = 0
        else:
            self.custo = inicio.custo + arco.custo

    def fim(self):
        if self.arco is None:
            return self.inicio
        else:
            return self.arco.chegada_no

    def nos(self):
        atual = self
        while atual.arco is not None:
            yield atual.arco.chegada_no
            atual = atual.inicio
        yield atual.inicio

    def initial_nodes(self):

        if self.arco is not None:
            yield from self.inicio.nos()

    def __repr__(self):
        if self.arco is None:
            return str(self.inicio)
        elif self.arco.acao:
            return f"""{self.inicio}
        --{self.arco.acao}--> {self.arco.chegada_no}"""
        else:
            return f"{self.inicio} --> {self.arco.chegada_no}"
        

# ============== #
# Busca Genérica #
# ============== #


class Buscador(Visualizavel):
    """
    retorna um buscador para um problema
    um caminho é feito se chamando várias vezes o buscador
    faz busca em profundidade
    """
    def __init__(self, problema):
        self.problema = problema
        self.inicializa_fronteira()
        self.num_expandidos = 0
        self.acrescente_a_fronteira(Caminho(problema.no_de_inicio()))
        super().__init__()

    def inicializa_fronteira(self):
        self.fronteira = []

    def fronteira_vazia(self):
        return self.fronteira == []

    def acrescente_a_fronteira(self, caminho):
        self.fronteira.append(caminho)

    @visualize
    def busca(self):

        while not self.fronteira_vazia():
            caminho = self.fronteira.pop()
            self.visual(1, "Expandindo:", caminho, "(custo:", caminho.custo, ")")
            self.num_expandidos += 1
            if self.problema.eh_objetivo(caminho.fim()):
                self.visual(1, self.num_expandidos, "caminhos expandidos e ",
                            len(self.fronteira), "caminhos restantes na fronteira")
                self.solucao = caminho
                return caminho
            else:
                vizi = self.problema.vizin(caminho.fim())
                self.visual(3, "vizinhos sao ", vizi)
                for arco in reversed(list(vizi)):
                    self.acrescente_a_fronteira(Caminho(caminho, arco))
                self.visual(3, "Fronteira:", self.fronteira)
        self.visual(1, "Sem (mais) soluções. Total de",
                        self.num_expandidos, "caminhos  expandidos.")


# ============ #
# PSR Exemplos #
# ============ #


def nao_eh(val):
    def nev(x):
        return val != x
    nev.__name__ = str(val) + "!="
    return nev


def eh_(val):
    def isv(x):
        return val == x
    isv.__name__ = str(val) + "=="
    return isv


# ============ #
# PSR Problema #
# ============ #


class Variavel(object):
    def __init__(self, nome, dominio, posicao=None):
        self.nome = nome   # string
        self.dominio = dominio  # lista de valores
        self.posicao = posicao if posicao else (random.random(), random.random())
        self.tamanho = len(dominio)

    def __str__(self):
        return self.nome

    def __repr__(self):
        return self.nome


class Restricao(object):
    def __init__(self, escopo, relacao, string=None, posicao=None):
        self.escopo = escopo
        self.relacao = relacao
        if string is None:
            self.string = self.relacao.__name__ + str(self.escopo)
        else:
            self.string = string
        self.posicao = posicao

    def __repr__(self):
        return self.string

    def pode_avaliar(self, atribuicao):
        return all(v in atribuicao for v in self.escopo)

    def vale(self, atribuicao):
        return self.relacao(*tuple(atribuicao[v] for v in self.escopo))


class PSR(object):
    def __init__(self, titulo, variaveis, restricoes):
        self.titulo = titulo
        self.variaveis = variaveis
        self.restricoes = restricoes
        self.var_para_const = {var: set() for var in self.variaveis}
        for con in restricoes:
            for var in con.escopo:
                self.var_para_const[var].add(con)

    def __str__(self):
        return str(self.titulo)

    def __repr__(self):
        return f"PSR({self.titulo}, {self.variaveis}, {([str(c) for c in self.restricoes])})"

    def consistente(self, atribuicao):
        return all(con.vale(atribuicao)
                    for con in self.restricoes
                    if con.pode_avaliar(atribuicao))

    def show(self):
        plt.ion()
        ax = plt.figure().gca()
        ax.set_axis_off()
        plt.title(self.titulo)
        var_bbox = dict(boxstyle="round4,pad=1.0,rounding_size=0.5")
        con_bbox = dict(boxstyle="square,pad=1.0", color="green")
        for var in self.variaveis:
            if var.posicao is None:
                var.posicao = (random.random(), random.random())
        for con in self.restricoes:
            if con.posicao is None:
                con.posicao = tuple(sum(var.posicao[i] for var in con.escopo) / len(con.escopo)
                                    for i in range(2))
            bbox = dict(boxstyle="square,pad=1.0", color="green")
            for var in con.escopo:
                ax.annotate(con.string, var.posicao, xytext=con.posicao,
                            arrowprops={'arrowstyle': '-'}, bbox=con_bbox,
                            ha='center')
        for var in self.variaveis:
            x, y = var.posicao
            plt.text(x, y, var.nome, bbox=var_bbox, ha='center')



# ========= #
# Utilities #
# ========= #


def argmaxall(gen):
    maxv = -math.inf
    maxvals = []
    for (e, v) in gen:
        if v > maxv:
            maxvals, maxv = [e], v
        elif v == maxv:
            maxvals.append(e)
    return maxvals


def argmaxe(gen):
    return random.choice(argmaxall(gen))


def argmax(lst):
    return argmaxe(enumerate(lst))


def argmaxd(dct):
    return argmaxe(dct.items())


def flip(prob):
    return random.random() < prob


def dict_union(d1, d2):
    d = dict(d1)    # copia d1
    d.update(d2)
    return d


# ========= #
# PSR Busca #
# ========= #

class Busca_em_PSR(Busca_problema):

    def __init__(self, psr, variavel_ordem=None):
        self.psr = psr
        if variavel_ordem:
            assert set(variavel_ordem) == set(psr.variaveis)
            assert len(variavel_ordem) == len(psr.variaveis)
            self.variaveis = variavel_ordem
        else:
            self.variaveis = list(psr.variaveis)

    def eh_objetivo(self, no):
        return len(no) == len(self.psr.variaveis)

    def no_de_inicio(self):
        return {}

    def vizin(self, no):
        var = self.variaveis[len(no)]
        res = []
        for val in var.dominio:
            novo_env = dict_union(no, {var: val})
            if self.psr.consistente(novo_env):
                res.append(arco(no, novo_env))
        return res



def solucoes_por_buscador(psr):
    def busca_recursiva(parcial, variaveis_restantes):
        if not variaveis_restantes:
            if psr.consistente(parcial):
                yield parcial
            return
        
        var = variaveis_restantes[0]
        for valor in var.dominio:
            novo_parcial = dict_union(parcial, {var: valor})
            if psr.consistente(novo_parcial):
                yield from busca_recursiva(novo_parcial, variaveis_restantes[1:])

    variaveis = list(psr.variaveis)
    yield from busca_recursiva({}, variaveis)

def criar_restricao(escopo, relacao):
    string = f"{' != '.join(var.nome for var in escopo)}"
    return Restricao(escopo, relacao, string)

def criar_psr_mapa_australia(grafo, cores):
    
    dominio_cores = set(cores)
    variaveis = {Variavel(estado, dominio_cores) for estado in grafo.keys()}
    psr_australia = PSR("Mapa da Austrália", variaveis, [])

    psr_australia.variaveis_dict = {var.nome: var for var in variaveis}

    for estado, vizinhos in grafo.items():
        for vizinho in vizinhos:
            restricao = criar_restricao([psr_australia.variaveis_dict[estado], psr_australia.variaveis_dict[vizinho]], ne)
            psr_australia.restricoes.append(restricao)

    return psr_australia

def adicionar_restricao(psr, var_nome, valor):
    var = psr.variaveis_dict[var_nome]
    restricao = criar_restricao([var], eh_(valor))
    psr.restricoes.append(restricao)
`

const plotSolutuins = `
def plot_solutions(psr, solutions):
    # Prepara o buffer para salvar a imagem
    buf = BytesIO()
    try:
        if len(solutions) <= 100:
            plt.figure(figsize=(15, 15))
            rows = int(len(solutions) ** 0.5)
            cols = (len(solutions) + rows - 1)

            for i, solution in enumerate(solutions):
                plt.subplot(rows, cols, i+1)
                plt.title(f"Solução {i+1}")
                colors = [solution[var] for var in psr.variaveis]
                G = nx.Graph()
                for var in psr.variaveis:
                    G.add_node(var.nome)
                for restricao in psr.restricoes:
                    escopo = restricao.escopo
                    for i in range(len(escopo)):
                        for j in range(i + 1, len(escopo)):
                            G.add_edge(escopo[i].nome, escopo[j].nome)
                pos = nx.shell_layout(G, scale=2)
                nx.draw(G, pos, node_color=colors, with_labels=True, node_size=700, font_size=8, font_weight='bold', font_color='black')

            plt.tight_layout()
            # Salva a figura no buffer em formato PNG
            plt.savefig(buf, format='png')
            # Codifica o conteúdo do buffer para base64
            image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
            plt.close()
            return image_base64
        else:
            print("Número de soluções excede 100. Escolhendo uma solução aleatória.")
            return plot_random(psr, solutions)
            
    except Exception as e:
        print("Erro ao plotar o grafo:", e)
        plt.close()
        return None

def plot_random(psr, solutions):
    print('entrou aqui')
    # Prepara o buffer para salvar a imagem
    buf = BytesIO()
    try:
        solution = random.choice(solutions)

        plt.figure(figsize=(8, 8))
        plt.title("Solução Aleatória")
        colors = [solution[var] for var in psr.variaveis]
        G = nx.Graph()
        for var in psr.variaveis:
            G.add_node(var.nome)
        for restricao in psr.restricoes:
            escopo = restricao.escopo
            for i in range(len(escopo)):
                for j in range(i + 1, len(escopo)):
                    G.add_edge(escopo[i].nome, escopo[j].nome)
        pos = nx.shell_layout(G, scale=2)

        nx.draw(G, pos, node_color=colors, with_labels=True, node_size=800, font_size=8, font_weight='bold', font_color='white')
        plt.tight_layout()
        
        # Salva a figura no buffer em formato PNG
        plt.savefig(buf, format='png')
        # Codifica o conteúdo do buffer para base64
        image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        plt.close()
        return image_base64
    except Exception as e:
        print("Erro ao plotar o grafo:", e)
        plt.close()
        return None
`


async function runPythonCode() {
    
    if (!window.pyodide) {
        window.pyodide = await loadPyodideAndPackages();
    }

    const dataAsString = JSON.stringify({
        
        colorsSelected: colorSearchSelect.selectedOptions,
        restrictionsApplied: restrictionsJSON
    });


        const pythonScript = `
import json
import random
import math
import matplotlib.pyplot as plt
import networkx as nx
import base64
from io import BytesIO

${pkg}

${plotSolutuins}

data = ${dataAsString}
print(f"==>> data: {data}")



mapa_da_australia = {
    'WA': ['NT', 'SA'],
    'NT': ['WA', 'SA', 'Q'],
    'SA': ['WA', 'NT', 'Q', 'NSW', 'V'],
    'Q': ['NT', 'SA', 'NSW'],
    'NSW': ['SA', 'Q', 'V'],
    'V': ['SA', 'NSW'],
    'T': [],
}


psr_australia = criar_psr_mapa_australia(mapa_da_australia, data['colorsSelected'])

for restricao in data['restrictionsApplied']:
    adicionar_restricao(psr_australia, restricao['textContent'], restricao['backgroundColor'])

solucoes = list(solucoes_por_buscador(psr_australia))

if solucoes:
    print("Soluções encontradas:")
    for i, solucao in enumerate(solucoes):
        print(f"Solução {i + 1}:")
        for estado, cor in solucao.items():
            print(f"{estado}: {cor}")
        print()
    image_base64 = plot_solutions(psr_australia, solucoes)
    
else:
    print("Nenhuma solução encontrada.")

plt.close()
image_base64
`

    try {


        const imageBase64 = await pyodideRuntime.runPythonAsync(pythonScript);

        const imgElement = document.createElement('img');
        imgElement.src = 'data:image/png;base64,' + imageBase64;
        document.body.appendChild(imgElement);


        hideLoading();
    } catch (error) {
        console.error("Erro ao executar o código Python:", error);
        document.getElementById('output').textContent = "Erro ao executar o código Python.";
        hideLoading();
    }
    
    
}





function setupPrintButton() {
    document.getElementById('printButton').addEventListener('click', function() {
        console.log('Cores selecionadas:');
        console.log(colorSearchSelect.selectedOptions);

        console.log('Restrições aplicadas:');
        console.log(restrictionsJSON);
        showLoading() 
    });
}
