App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here

});

//IndexRoute is the homepage
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return [
    {
      id: 1,
      title: 'Practical Object-Oriented Design in Ruby: An Agile Primer',
      author: 'Sandi Metz',
      review: 'If you just graduated from a Dev-bootcamp course and want the next book, this is it. Novice Ruby programmers will find specific rules to live by; intermediate Ruby programmers will find valuable principles they can flexibly interpret and apply; and advanced Ruby programmers will find a common language they can use to lead development and guide their colleagues.',
      rating: 5,
      genre: 1,
      amazon_id: '0321721330',
      url: 'http://www.amazon.com/Practical-Object-Oriented-Design-Ruby-Addison-Wesley/dp/0321721330',
      image: 'http://ecx.images-amazon.com/images/I/513q2AOSeAL.jpg'
    },
    {
      id: 2,
      title: 'The Rails 4 Way (3rd Edition)',
      author: 'Obie Fernandez',
      review: 'An in-depth thinking into the changes in Ruby on Rails as it moves to 4.0 and beyond. This is the direction Rails will be go in the future. So why not get an idea into the thinking of leaders in the Rails world.',
      rating: 5,
      genre: 1,
      amazon_id: '0321944275',
      url: 'http://www.amazon.com/Rails-Edition-Addison-Wesley-Professional-Series/dp/0321944275',
      image: 'http://ecx.images-amazon.com/images/I/51X4nf0-thL.jpg'
    },
    {
      id: 3,
      title: 'Agile Web Development with Rails 4',
      author: 'Sam Ruby',
      review: 'A great walkthough of building a full-functioning Rails application in Rails 4.',
      rating: 5,
      genre: 2,
      amazon_id: '1937785564',
      url: 'http://www.amazon.com/Agile-Development-Rails-Facets-Ruby/dp/1937785564',
      image: 'http://ecx.images-amazon.com/images/I/71RWYvCLIkL.jpg'
    },
    {
      id: 4,
      title: 'Programming Ruby 1.9 & 2.0: The Pragmatic Programmers\' Guide',
      author: 'Dave Thomas',
      review: 'This book is a standard. It is known as Pickaxe because it is on the cover of the book. If you tell a Ruby programmer the Pickaxe Book, they know what you mean. Truthfully, I did not use this book as much as I thought I would, but it is essentially the missing manual for using the Ruby language.',
      rating: 4,
      genre: 1,
      amazon_id: '1937785491',
      url: 'http://www.amazon.com/Programming-Ruby-1-9-2-0-Programmers/dp/1937785491',
      image: 'http://ecx.images-amazon.com/images/I/71qeUXEEl6L.jpg'
    },
    {
      id: 5,
      title: 'Learn to Program',
      author: 'Chris Pine',
      review: 'The very first book I read to learn Ruby. It is a general book about programming, but the examples are writtenin Ruby, which make it perfect for the novi Rubyist.',
      rating: 5,
      genre: 1,
      amazon_id: '1934356360',
      url: 'http://www.amazon.com/Program-Second-Edition-Facets-Series/dp/1934356360',
      image: 'http://ecx.images-amazon.com/images/I/91rtZ1HpYIL.jpg'
    },
    ];
  }
});
