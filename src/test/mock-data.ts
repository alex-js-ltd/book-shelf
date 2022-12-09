const books = [
  {
    author: 'Ibram X. Kendi',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51JM3rldZCL._SX329_BO1,204,203,200_.jpg',
    pageCount: 320,
    publisher: 'One World',
    synopsis:
      'Antiracism is a transformative concept that reorients and reenergizes the conversation about racism—and, even more fundamentally, points us toward liberating new ways of thinking about ourselves and each other. At its core, racism is a powerful system that creates false hierarchies of human value; its warped logic extends beyond race, from the way we regard people of different ethnicities or skin colors to the way we treat people of different sexes, gender identities, and body types. Racism intersects with class and culture and geography and even changes the way we see and value ourselves. In How to Be an Antiracist, Kendi takes readers through a widening circle of antiracist ideas—from the most basic concepts to visionary possibilities—that will help readers see all forms of racism clearly, understand their poisonous consequences, and work to oppose them in our systems and in ourselves.\n\nKendi weaves an electrifying combination of ethics, history, law, and science with his own personal story of awakening to antiracism. This is an essential work for anyone who wants to go beyond the awareness of racism to the next step: contributing to the formation of a just and equitable society.',
    title: 'How to Be an Antiracist',
    objectID: 'pNr5WijSHbHQ38CDqZMz',
  },
  {
    author: 'J. K. Rowling',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51SfTd37PaL._SX415_BO1,204,203,200_.jpg',
    pageCount: 896,
    publisher: 'Scholastic',
    synopsis:
      "In his fifth year at Hogwart's, Harry faces challenges at every turn, from the dark threat of He-Who-Must-Not-Be-Named and the unreliability of the government of the magical world to the rise of Ron Weasley as the keeper of the Gryffindor Quidditch Team. Along the way he learns about the strength of his friends, the fierceness of his enemies, and the meaning of sacrifice",
    title: 'Harry Potter and the Order of the Phoenix',
    objectID: 'jcxZeQ6z19LHlYp5BdHC',
  },
  {
    author: 'J. K. Rowling',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51KV4CXARLL._SX342_BO1,204,203,200_.jpg',
    pageCount: 652,
    publisher: 'Scholastic',
    synopsis:
      "The war against Voldemort is not going well; even the Muggles have been affected. Dumbledore is absent from Hogwarts for long stretches of time, and the Order of the Phoenix has already suffered losses. And yet . . . as with all wars, life goes on. Sixth-year students learn to Apparate. Teenagers flirt and fight and fall in love. Harry receives some extraordinary help in Potions from the mysterious Half-Blood Prince. And with Dumbledore's guidance, he seeks out the full, complex story of the boy who became Lord Voldemort -- and thus finds what may be his only vulnerability.",
    title: 'Harry Potter and the Half-Blood Prince',
    objectID: 'bpSKjYk1RG7hXuWbtiBJ',
  },
  {
    author: 'J. K. Rowling',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51IiQ4r35LL._SX345_BO1,204,203,200_.jpg',
    pageCount: 448,
    publisher: 'Scholastic',
    synopsis:
      'In this third installment in the projected seven-volume series, Sirius Black, imprisoned for killing 13 people with one curse, escapes from Azkaban. As he heads for Hogwarts, the chilling Dementors who trail him quickly descend upon the school. "Each successive volume expands upon its predecessor with dizzyingly well-planned plots and inventive surprises," said PW in a Best Books of 2001 citation. Ages 8-up.',
    title: 'Harry Potter and the Prisoner of Azkaban',
    objectID: 'bV2CcqDZeVsEuZOFWYcB',
  },
  {
    author: 'J. K. Rowling',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg',
    pageCount: 309,
    publisher: 'Scholastic',
    synopsis:
      "Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were. But everything changes when Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright. From the surprising way he is greeted by a lovable giant, to the unique curriculum and colorful faculty at his unusual school, Harry finds himself drawn deep inside a mystical world he never knew existed and closer to his own noble destiny.",
    title: "Harry Potter and the Sorcerer's Stone",
    objectID: 'XdpbZ0jl8qsTbUo6HKN1',
  },
  {
    author: 'Zack Argyle',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41JodZ5Vl%2BL.jpg',
    pageCount: 372,
    publisher: 'Self Published',
    synopsis:
      "Chrys Valerian is a threadweaver, a high general, and soon-to-be father. But to the people of Alchea, he is the Apogee—the man who won the war.\n\nWhen a stranger's prophecy foretells danger to Chrys' child, he must do everything in his power to protect his family—even if the most dangerous enemy is the voice in his own head.\n\nTo the west, a sheltered girl seeks to find her place in the world.\n\nTo the south, a young man's life changes after he dies.\n\nTogether, they will change the world—whether they intend to or not.",
    title: 'Voice of War',
    objectID: 'NdOO5IdCiODuzmQB9BdB',
  },
  {
    author: 'J. K. Rowling',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51OORp1XD1L._SX421_BO1,204,203,200_.jpg',
    pageCount: 752,
    publisher: 'Scholastic',
    synopsis:
      "Harry Potter is midway through his training as a wizard and his coming of age. Harry wants to get away from the pernicious Dursleys and go to the International Quidditch Cup. He wants to find out about the mysterious event that's supposed to take place at Hogwarts this year, an event involving two other rival schools of magic, and a competition that hasn't happened for a hundred years. He wants to be a normal, fourteen-year-old wizard. But unfortunately for Harry Potter, he's not normal - even by wizarding standards. And in his case, different can be deadly.",
    title: 'Harry Potter and the Goblet of Fire',
    objectID: 'HtKkPrhIMrQkwHvsLTxd',
  },
  {
    author: 'J. R. R. Tolkien',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51r6XIPWmoL._SX331_BO1,204,203,200_.jpg',
    pageCount: 1178,
    publisher: 'Houghton Mifflin Harcourt',
    synopsis:
      'In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins.',
    title: 'The Lord of the Rings',
    objectID: 'HJnisVZEdNkmrh7B5Dd1',
  },
  {
    author: 'J. R. R. Tolkien',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61VxEKq8B1L._SX365_BO1,204,203,200_.jpg',
    pageCount: 320,
    publisher: 'Houghton Mifflin Harcourt',
    synopsis:
      'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter both a magic ring and a frightening creature known as Gollum.',
    title: 'The Hobbit',
    objectID: 'CTPqOhujzM6USBVRfU3l',
  },
  {
    author: 'J. K. Rowling',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg',
    pageCount: 341,
    publisher: 'Scholastic',
    synopsis:
      "Ever since Harry Potter had come home for the summer, the Dursleys had been so mean and hideous that all Harry wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he's packing his bags, Harry receives a warning from a strange, impish creature who says that if Harry returns to Hogwarts, disaster will strike. And strike it does. For in Harry's second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor and a spirit who haunts the girls' bathroom. But then the real trouble begins -- someone is turning Hogwarts students to stone. Could it be Draco Malfoy, a more poisonous rival than ever? Could it possibly be Hagrid, whose mysterious past is finally told? Or could it be the one everyone at Hogwarts most suspects...Harry Potter himself!",
    title: 'Harry Potter and the Chamber of Secrets',
    objectID: 'AVKZkjNfMg0h1VzJP2fl',
  },
]

const readingList = [
  {
    title: 'Harry Potter and the Order of the Phoenix',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51SfTd37PaL._SX415_BO1,204,203,200_.jpg',
    publisher: 'Scholastic',
    synopsis:
      "In his fifth year at Hogwart's, Harry faces challenges at every turn, from the dark threat of He-Who-Must-Not-Be-Named and the unreliability of the government of the magical world to the rise of Ron Weasley as the keeper of the Gryffindor Quidditch Team. Along the way he learns about the strength of his friends, the fierceness of his enemies, and the meaning of sacrifice",
    finishDate: null,
    startDate: 1670585293630,
    objectID: 'jcxZeQ6z19LHlYp5BdHC',
    pageCount: 896,
    author: 'J. K. Rowling',
  },
]
export { books, readingList }
