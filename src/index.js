console.log('%c HI', 'color: firebrick')

function loadDogs() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load images')
        }return response.json()
    })
    .then(dogData => {
        const dogImgContainer = document.getElementById('dog-image-container')
        
        dogData.message.forEach(imageUrl => {
            const img = document.createElement('img')
            img.src = imageUrl
            dogImgContainer.appendChild(img)
        })
    })
    .catch(error => {
        console.log("Error fetching images: ", error)
    })
}

function loadDogBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to populate list')
        } return response.json()
    })
    .then(breedData => {
        const dogBreedContainer = document.getElementById('dog-breeds')
        const breeds = Object.keys(breedData.message)

        breeds.forEach(breed => {
            const li = document.createElement('li')
            li.textContent = breed
            li.classList.add(`dog-breed-list`)
            dogBreedContainer.appendChild(li)
        })
        const breedListItems = document.querySelectorAll(".dog-breed-list")
            for (const item of breedListItems) {
            item.addEventListener('click', handleColorChange)
        }
    })
    .catch(error => {
        console.log("Error fetching breeds: ", error)
    })
}

function handleColorChange(e) {
    e.target.style.color = `#023e04`    
}

loadDogs()
loadDogBreeds()

const dropdown = document.getElementById('breed-dropdown')
    dropdown.addEventListener('change', () => {
        const selectedValue = dropdown.value
        listSort(selectedValue)
    })

function listSort(letter) {
    const list = document.getElementById('dog-breeds')
    const items = Array.from(list.children)
    
    items.forEach(item => {
        const text = item.textContent.trim().toLowerCase()
        const firstChar = text.charAt(0)

        if (firstChar === letter.toLowerCase()) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    })
}