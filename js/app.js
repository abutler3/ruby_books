App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.resource('book', { path: '/books/:book_id'} )
  this.resource('genre', { path: '/genres/:genre_id'} )
  this.resource('reviews', function() {
    this.route('new');
  });
});

//IndexRoute is the homepage
App.IndexRoute = Ember.Route.extend({
  model: function() {
    // specifies two models in index
    // RSVP object = until everyone has RSVPed, don't finalize it
    return Ember.RSVP.hash({
      books: this.store.findAll('book'),
      genres: this.store.findAll('genre')
    });
    // return this.store.findAll('book');
  },
  // Return what has been found in model
  setupController: function(controller, model) {
    // Take the model, set the array of books on controller as model
    // Here we want to set books as model.books with a books key and
    // a genres key
    controller.set('books', model.books);
    controller.set('genres', model.genres);
  }
});

// If include an RSVP, you need to give it a controller
// Because before it was probably using ObjectController
// so I had to be a little more explicit
App.IndexController = Ember.Controller.extend({
});

//Works as default so this is optional
App.BookRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('book', params.book_id);
  }
});

App.BooksController = Ember.ArrayController.extend({
  // Every item in this books array has a title and we should sort by it
  sortProperties: ['title']
});

App.GenresController = Ember.ArrayController.extend({
  // Every item in this books array has a title and we should sort by it
  sortProperties: ['name']
});

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new Firebase("https://glaring-fire-7125.firebaseio.com")
});

App.ReviewsNewRoute = Ember.Route.extend({
  // Model is setting the title property on book
  model: function() {
    // specifies two models in index
    // RSVP object = until everyone has RSVPed, don't finalize it
    return Ember.RSVP.hash({
      book: this.store.createRecord('book'),
      // Getting an array of genres
      genres: this.store.findAll('genre')
    });
    // return this.store.findAll('book');
  },
  // Return what has been found in model
  setupController: function(controller, model) {
    // Take the model, set the array of books on controller as model
    // Here we want to set books as model.books with a books key and
    // a genres key
    controller.set('model', model.book);
    // Setting them on the controller
    controller.set('genres', model.genres);
  },
  actions: {
    willTransition: function(transition) {
      if(this.currentModel.book.get('isNew')) {
        if(confirm("Are you sure?")) {
          this.currentModel.book.destroyRecord();
        } else {
          transition.abort();
        }
      }
    }
  }
});

App.ReviewsNewController = Ember.Controller.extend({
  ratings: [5, 4, 3, 2, 1],
  actions: {
    createReview: function() {
      var controller = this;
      this.get('model').save().then(function(model) {
        var genre = model.get('genre');
        genre.get('books').then(function(books){
          books.pushObject(model);
          genre.save();
          controller.transitionToRoute('index');
        });
      });
    }
  }
});

App.BookDetailsComponent = Ember.Component.extend({
  // extending a component, for example, by adding a class
  // Give the class whatever this function (ratingClass) returns
  classNameBindings: ['ratingClass'],
  ratingClass: function() {
    return "rating-" + this.get('book.rating');
  }.property('book.rating')
});

// Creating a model
App.Book = DS.Model.extend({
  title: DS.attr(),
  author: DS.attr(),
  review: DS.attr(),
  rating: DS.attr(),
  genre: DS.belongsTo('genre'),
  amazon_id: DS.attr(),
  url: function() {
    return "http://www.amazon.com/dp/"+this.get('amazon_id');
  }.property('amazon_id'),
  image: function() {
    return "http://images.amazon.com/images/P/"+this.get('amazon_id')+".01.ZTZZZZZZ.jpg";
  }.property('amazon_id')
});

App.Book.FIXTURES = [
    {
      id: 1,
      title: 'Practical Object-Oriented Design in Ruby: An Agile Primer',
      author: 'Sandi Metz',
      review: 'If you just graduated from a Dev-bootcamp course and want the next book, this is it. Novice Ruby programmers will find specific rules to live by; intermediate Ruby programmers will find valuable principles they can flexibly interpret and apply; and advanced Ruby programmers will find a common language they can use to lead development and guide their colleagues.',
      rating: 5,
      genre: 1,
      amazon_id: '0321721330'
    },
    {
      id: 2,
      title: 'The Rails 4 Way (3rd Edition)',
      author: 'Obie Fernandez',
      review: 'An in-depth thinking into the changes in Ruby on Rails as it moves to 4.0 and beyond. This is the direction Rails will be go in the future. So why not get an idea into the thinking of leaders in the Rails world.',
      rating: 5,
      genre: 1,
      amazon_id: '0321944275'
    },
    {
      id: 3,
      title: 'Agile Web Development with Rails 4',
      author: 'Sam Ruby',
      review: 'A great walkthough of building a full-functioning Rails application in Rails 4.',
      rating: 5,
      genre: 2,
      amazon_id: '1937785564'
    },
    {
      id: 4,
      title: 'Programming Ruby 1.9 & 2.0: The Pragmatic Programmers\' Guide',
      author: 'Dave Thomas',
      review: 'This book is a standard. It is known as Pickaxe because it is on the cover of the book. If you tell a Ruby programmer the Pickaxe Book, they know what you mean. Truthfully, I did not use this book as much as I thought I would, but it is essentially the missing manual for using the Ruby language.',
      rating: 4,
      genre: 1,
      amazon_id: '1937785491'
    },
    {
      id: 5,
      title: 'Learn to Program',
      author: 'Chris Pine',
      review: 'The very first book I read to learn Ruby. It is a general book about programming, but the examples are writtenin Ruby, which make it perfect for the novi Rubyist.',
      rating: 5,
      genre: 1,
      amazon_id: '1934356360'
    },
    {
      id: 6,
      title: 'The Well-Grounded Rubyist',
      author: 'David Black',
      review: 'Everyone has recommended this book to me and I really need to get around to reading it. I will probably do it during my next vacation. The updated version covers the latest version of Ruby, 2.1.',
      rating: 3,
      genre: 1,
      amazon_id: '1617291692'
    },
    {
      id: 7,
      title: 'Ruby on Rails Tutorial: Learn Web Development with Rails (2nd Edition)',
      author: 'Michael Hartl',
      review: 'Used this book concurrently with my bootcamp experience. It was great. You get up to speed with testing and test-driven development and rspec. TIP: DON\'T BUY FROM AMAZON. Go through his website railstutorial.com. It has the most updated version and you can purchase screencasts to go with the book. Also, the PDF is available for free on the website.',
      rating: 5,
      genre: 2,
      amazon_id: '0321832051'
    },
    {
      id: 8,
      title: 'The Ruby Programming Language',
      author: 'David Flanagan',
      review: 'Good read, but it does not cover the latest Ruby 2.0. But it does give you a good overview of 1.9.',
      rating: 3,
      genre: 1,
      amazon_id: '0596516177'
    },
    {
      id: 9,
      title: 'Ruby on Rails 4.0 Guide',
      author: 'Stefan Wintermeyer',
      review: 'An ebook that goes over the bare basics of Rails. Okay guide, but not as indepth as some of the others on this list.',
      rating: 3,
      genre: 1,
      amazon_id: 'B00E25KVLW'
    },
    {
      id: 10,
      title: 'The RSpec Book: Behaviour Driven Development with RSpec, Cucumber, and Friends',
      author: 'David Chelimsky',
      review: 'One of the few books written about Rspec. For that alone, it is worth picking up. It is a touch outdated. But it covers the same basic concepts of BDD and TDD.',
      rating: 3,
      genre: 3,
      amazon_id: '1934356379'
    },
    {
      id: 11,
      title: 'Metaprogramming Ruby 2: Program Like the Ruby Pros',
      author: 'Paolo Perrotta',
      review: 'Another book on the todo list. I picked up Pragmatic Programmers video series on metaprogramming and it was a good watch.',
      rating: 3,
      genre: 1,
      amazon_id: '1941222129'
    },
    {
      id: 12,
      title: 'Computer Science Programming Basics in Ruby',
      author: 'Ophir Frieder',
      review: 'One thing about the dev bootcamp-type experience: it did not go deeply into basics of computer programming. This is a like a basic computer science textbook with Ruby based examples.',
      rating: 4,
      genre: 1,
      amazon_id: '1449355978'
    },
    {
      id: 13,
      title: 'Beginning Rails 4 (Expert\'s Voice in Web Development)',
      author: 'Adam Gamble',
      review: 'This is another tutorial book that takes you through the basics of building a blog in Rails. Covers Rails 4 and it\'s very clear. Great for a beginner or someone who needs a refresher.',
      rating: 5,
      genre: 2,
      amazon_id: '1430260343'
    },
    {
      id: 14,
      title: 'Programming Problems in Ruby',
      author: 'Bradley Green',
      review: 'Great book to run through interview questions in Ruby. Shows you how to answer potential techincal interview questions in Ruby',
      rating: 5,
      genre: 2,
      amazon_id: '1492141119'
    }
];

App.Genre = DS.Model.extend({
  name: DS.attr(),
  books: DS.hasMany('book', {async: true})
});


App.Genre.FIXTURES = [
    {
      id: 1,
      name: 'code examples',
      books: [1,2,4,5,6,8,9,11,12]
    },
    {
      id: 2,
      name: 'walkthroughs',
      books: [3,7,13,14]
    },
    {
      id: 3,
      name: 'testing',
      books: [10]
    }
];
