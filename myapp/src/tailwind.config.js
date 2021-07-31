module.exports = {
  purge: [],
  darkMode: "media", // or 'media' or 'class'
  theme: {
   
   fontFamily: {
    'sans': ["Helvetica Neue"],
   }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  theme:{
    container:{
      center:true,
      padding:'2rem'
    }
  },
  theme: {
    extend: {
      backgroundImage: theme => ({
       'popcorn': "url('https://image.freepik.com/free-photo/popcorn-background-cinema-concept_23-2148115926.jpg')",
      
      })
    }
  }
}


