---
slug: ruby
title: Ruby Essentials
authors: [jiaqi]
tags: [Chef, Ruby]
---

Ruby is a simple programming language. Chef uses Ruby as its reference language to define the patterns that are found in
resources, recipes, and cookbooks. Chef also uses these patterns to configure, deploy, and manage nodes across the
network.

<!--truncate-->

Instally Ruby
-------------

### Mac OS

Ruby comes pre-installed on macOS. However, pre-installed Ruby might be a few versions behind. The latest version can be
installed using a package manager like Homebrew, making it easy to install Ruby. Just run the following command.

```bash
brew install ruby
```

### Linux

Linux and Ubuntu use the apt package manager for installation. Run the following command in the terminal to install
Ruby.

```bash
sudo apt-get install ruby-full
```

Ruby Syntax
-----------

### Control Flow

Ruby's `if` statement takes an expression and executes the code based on the evaluation of that expression. If the
expression evaluates to `true`, Ruby executes the block of code following the `if` statement. If the expression
evaluates to `false`, then it doesn't execute the code. For example,

```ruby
x = 10
if x > 7
 puts "x is greater than 7"
end
```

The `else` statement is the partner of the `if` statement. If the expression evaluates to `true`, then the statement
following the condition is executed. If the expression evaluates to `false`, then the statement following the else
statement is executed.

```ruby
x = 10

if x < 7
 puts "x is less than 7"
else
 puts "x is greater than 7"
end
```

The `if…else` structure keeps us restricted to two options. What if we want to have more options in our program? Here,
`elsif` comes to the rescue and allows us to add alternatives to the traditional `if…else`.

```ruby
x = 10

if x < 7
 puts "x is less than 7"
elsif x > 7
 puts "x is greater than 7"
else
 puts "x is equal to 7"
end
```

Sometimes, instead of checking whether an expression is true, we are more interested in knowing if a condition is false
and executing a block of code. Ruby allows us such program control using **unless**. For example

```ruby
playing = false

unless playing
 puts "We're busy learning Ruby"
else
 puts "It's time to play games"
end
```

The switch statement is a selective control flow statement. It allows us to easily control the flow of the code when an
expression will result in one of a few anticipated values. Observe the following example.

```ruby
num = 0

case num
when 0
 puts "Zero"
when 1
 puts "One"
when 2
 puts "Two"
else
 puts "The entered number is greater than 2"
end
```

### Logical Operators

|            |                                                                                            |
|:----------:|:------------------------------------------------------------------------------------------:|
| `&&` (and) | A condition using the `&&` operator evaluates to `true` if both operands are `true`.       |
| `||` (or)  | A condition using the `||` operator evaluates to `true` if any of the operands are `true`. |
| `!` (not)  | The `!` operator reverses the state of a single operand.                                   |

### Loops

A `while` loop checks to see if the specified condition is `true`, and while it is, the loop keeps running. As soon as
the condition resolves to `false`, the loop stops.

```ruby
count = 1

while count < 10
 puts count
 count = count + 1
end
```

The **until** loop works similarly to the `while` loop, except it will run while the condition is `false` and stop if
the condition evaluates to `true`. For example:

```ruby
count = 6

until count > 10
 puts count
 count = count + 1
end
```

When we already know the number of times we want the loop to execute, we use a `for` loop:

```ruby
for count in 1...10
 puts count
end
```

> ⚠️ The example above uses **three-dot form** which creates a range that excludes the specified high value. For
> example,
>
> ```ruby
> for count in 1...10
>  puts count
> end
> ```
>
> The snippet above produces the sequence 1 to 9.
>
> The **double-dot form** includes the specified high value. The following example prints 1 to 10 on the screen:
>
> ```ruby
> for count in 1..10
>  puts count
> end
> ```

Like loops, iterators are methods that loop over a given set of data and perform a specified operation on each item. For
example, let's say we want to print the string “I am Learning Ruby” on the screen five times. Sure, we can use a for
loop, but we can also achieve the same functionality using the **times iterator**:

```ruby
5.times { puts "I am Learning Ruby!" }
```

Along with the times iterator, we also have the **each iterator**. Let's say that we have an array containing the days
of the week and we want to print them to the screen. In order to do that, we can use an each iterator.

```ruby
Terminal: ~ - irb
days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

days.each { |day| puts day }
```

### Arrays

We can declare items of the array by enclosing them in square brackets while separating the items using commas. For
example:

```ruby
months = ["January", "February", "March", "April", "May", "June", "July"]
```

We can refer to each item by referring to its zero-based index.

```ruby
puts months[6]
```

To **add** more items to the array, we can use the `<<` operator or `push`.

```ruby
months << "August"
months.push("September")
```

To inset an element at a desired position, we can use the `insert` method:

```ruby
months.insert(2, "October")
```

The **pop** method will remove the last item from the array.

```ruby
months.pop
```

The `delete_at` method will remove the item at the specified index position.

```ruby
months.delete_at(2)
```

To create nested arrays:

The **include?** method checks to see if the given argument is an element of the array. For example:

```ruby
my_array = [5, 9, 8, 2, 6]
puts my_array.include?(0) # returns false
puts my_array.include?(2) # returns true
```

When called on an array, the **sort** method will return a sorted array. For example:

```ruby
my_array = [5, 9, 8, 2, 6]
print my_array.sort
# results in my_array = [2, 5, 6, 8, 9]
```

The flatten method takes nested arrays and returns a single dimensional array.

```ruby
my_array = [5, 9, [8, 2, 6], [1, 0]]
print my_array.flatten
# results in my_array = [5, 9, 8, 2, 6, 1, 0]
```

The `map` method invokes the code inside the block once for each element in the array and will create and return a new
array that contains the values returned by the block. For example:

```ruby
my_array = [5, 9, 8, 2, 6]
print my_array.map { |item| item*2}
# results in my_array = [10, 18, 16, 4, 12]
```

### Hash

In a hash, each item is stored with an associated key, which can be any object, and we can refer to the item as a
key-value pair.

```ruby
person_hash = {
  "name" => "Jonathan",
  "age" => 25
 }
puts person_hash
```

Another way of creating a hash is using the keyword `new`.

```ruby
Person_hash = Hash.new
```

This will create an empty hash to which we can add values later on.

We can easily access hash values. For example:

```ruby
puts person_hash["name"]
puts person_hash["age"]
```

We can easily add to an existing hash by specifying a key-value pair.

```ruby
person_hash["gender"] = 'male'
```

We can use the **delete** function to remove items from hash.

```ruby
person_hash.delete("gender")
puts person_hash
```

To iterate over hashes

```ruby
person_hash.each do |key, value|
 puts "#{key} is #{value}"
end
```

The **has_key?** method is used to check if a hash contains a specific key and returns true if found. For example:

```ruby
puts person_hash.has_key?("name")
puts person_hash.has_key?("height")
```

The **select** method is usually used with a block and returns any key-value pairs that satisfy the condition in the
block

```ruby
puts person_hash.select{ |key, value| key == "name"}
```

### Sets

In Ruby, sets are collections of unique elements. The order of the elements doesn't matter, so they can't be reliably
referenced by an index. Sets are useful when we want to ensure there are no duplicate items.

Unlike any other collection, we need to add a `require` statement before making use of the Set class. The `require`
method is used to import all class and method definitions of the class. After that, we can create a set instance simply
using the `new` keyword. For example:

```ruby
require 'set'
my_set = Set.new
```

You can also pass an array to the new method to create a set.

```ruby
my_set = Set.new([5, 2, 9, 3, 1])
```

We can use the `<<` operator to add values to the set. Unlike arrays, we use the `add` method instead of `push`.

```ruby
my_set = Set.new
my_set << 5
my_set.add 1
```

### Function

A function is a set of statements that achieves a specific goal or performs a specific task. Ruby allows us to define
our own functions using the keyword `def`. For example:

```ruby
def greetings_with_name(name="Emily")
 puts "Hello #{name}!"
end
```

You can define methods that take any number of arguments.

```ruby
def optional_arguments(*a)
 puts a
end

optional_arguments("Hello", "World", 2021)
```

To define a function that will return the product of two variables:

```ruby
def prod(x, y)
 return x * y
end
```

Ruby also allows **implicit returns**. If a function lacks an explicit return statement, then Ruby will return the value
of the **last** executed instruction. For example

```ruby
def prod(x, y)
 x*y
end

puts prod(2, 5)
```

#### Yield

Using **yield** inside a method will allow us to call the method with a block of code that will be inserted in place of
the `yield` keyword. In other words, when the method gets to the `yield` keyword, it executes the block passed to the
method, then continues with any code after the yield keyword. Once the block is finished executing, it will return to
the code in the method. The following example will make the idea clear.

```ruby
# defining a method using yield
def yielding_test
 puts "We're now in the method!"
 yield
 puts "We're back in the method!"
end

# calling the method with the block
yielding_test { puts "The method has yielded to the block and We're in the block now!" }
```

When the above code executes, you will see the following on the screen.

```bash
We're now in the method!
The method has yielded to the block and We're in the block now!
We're back in the method!
```

We can also pass parameters to yield. Let's see another example.

```ruby
def yield_greetings(name)
 puts "We're now in the method!"
 yield("Emily")
 puts "In between the yields!"
 yield(name)
 puts "We're back in method."
end

yield_greetings("Erick") { |n| puts "Hello #{n}." }
```

### Classes

Just like objects in the real world, objects in programming are independent units with their own identity. For example,
an apple is an object that has its own unique identity. There could be multiple objects belonging to the same category.
For example, apples could be green or red, but they still belong to the same apple category. This category could be
referred to as a class.

A class contains the data and actions associated with the object. In simple words, a class is like a blueprint for an
object. Just like we can use blueprints to construct multiple buildings in the real world, we can use classes as a
blueprint to create multiple objects in programming.

We can define classes in Ruby by using the keyword **class** followed by the name of the class. Convention is that the
name of the class should start with a capital letter. For example:

```ruby
class Car
 def initialize
  puts "The object is now created"
 end
end
```

You can now create objects from class `Car` using the keyword `new` as follows:

```ruby
car = Car.new
```

We can also initialize the objects with some attributes. These attributes can also be called instance variables. Each
object of the class will have a separate copy of the instance variable.

Instance variables are preceded by **@**. For example, we can pass a parameter to the previously created initialize
method and assign its value to an instance variable as follows:

```ruby
class Car
 def initialize(brand)
  @brand = brand
 end
end
```

We can now create objects of the `Car` class by using the same `new` method, with the small difference of passing an
argument to it.

```ruby
car = Car.new("Audi")
```

#### Instance Methods and Class Methods

Ruby has two types of methods

1. instance methods, and
2. class methods

A class method is supposed to provide functionality to the class itself and cannot be called directly on an instance,
whereas an instance method provides functionality to the instance of the class and cannot be called on the class itself.

For example

```ruby
class Greetings
 def self.class_greetings
  puts "Hello, I'm a class method"
 end

 def instance_greetings
  puts "Hello, I'm an instance method"
 end
end
```

The Greetings class defines a class method, `self.class_greetings`, and an instance method, `instance_greetings`.

#### Instance Variables and Class Variables

Instance variables belong to the objects of the class and each object will have a separate copy of the instance
variables. On the other hand, class variables are accessible to all the objects of the class since it belongs to the
class and not a particular object.

We can declare a class variable with the prefix **@@**. For example:

```ruby
class Car
 @@count = 0
 def initialize
  @@count += 1
 end
 def self.get_instance_count
  @@count
 end
end
```

#### Mixins

It would be advantageous if we could inherit functionality from multiple places. Ruby provides this functionality using
**mixins**. A mixin is simply a set of code wrapped in a module that can be added to one or more classes to add to its
functionality. Once we 'mixin' a module into a class, the class can access all the methods of the module. For example

```ruby
module Greetings
 def say_hello
  puts "Hello!"
 end
end
```

Here we defined a simple module called `Greetings`. The module contains a single method which outputs "Hello!" to the
screen. Let's include this module in a class.

```ruby
class Person
 include Greetings
end
```

The `Person` class will now access the module's method as if it were its own instance method, as made clear from the
following.

```ruby
p1 = Person.new
p1.say_hello
# outputs Hello!
```

:::caution

In the example above, we can only access the module method as an _instance method_. If we try to call the method as a
class method then we will get an error.
:::

In order to access module methods as _class methods_, we would use **extend** keyword:

```ruby
class Person
 extend Greetings
end
```

Now we can call the module method as a class method. For example:

```ruby
Person.say_hello
# outputs Hello!
```

### Reading from the Console

Reading from the console is a way to get user input. Ruby has a **gets** method as a companion of puts and is used to
read data from the console. For example:

```ruby
puts "what is your name?"
# getting user input and storing it into a variable i.e. name
name = gets
puts "Hello #{name}"
```

The code above will first prompt the user for their name. It then stores the entered string into a variable called
`name`, which can be used later to print a simple message to the console.

### Creating a File

Ruby allows us to create and work with files using its built-in **File** class. Here's an example:

```ruby
test_file = File.new("test.txt", "w+")
```

The code above will create a text file named "test.txt". Specifying `w+` mode will give us read and write access. Before
moving forward, let's take a look at different file modes.

- r: This is the default mode for files in Ruby. It provides read-only access and starts reading the file at the
  beginning
- r+: Specifying this mode provides read and write access and it also starts at the beginning of the file
- w: This mode provides write-only access and specifying this mode will truncate the existing file and create a new file
  for writing
- w+: This mode provides both read and write access but it truncates the existing file and overwrites the existing file
  for reading and writing
- a: This mode is write only and specifying this mode will append to the end of the file for writing
- a+: This mode also provides both read and write access but it appends or reads from the end of the file

To open an existing file, use the **open** method of `File` class:

```ruby
test_file = File.open("test.txt", "w+")
```

Reading from the file is also as simple as a method call.

```ruby
File.read("test.txt")
```

Ruby allows us to write to files using either **puts** or **write**. The only difference between them is that _puts_
adds a line break to the end of the string to be added while `write` does not.

```ruby
test_file = File.open("test.txt", "w+")
test_file.puts("We're writing some text to file")
test_file.close
```

or

```ruby
File.open("test.txt", "w+") {
 |file| file.puts("This text was added using code block")
}
```

> 💡 We don't need to worry about closing the file here since Ruby will automatically close the file for us.

### Sending HTTP Requests

Ruby comes with a built-in HTTP client **net/http** that can be used to send any kind of HTTP request we may need. We
need to require the net/http client to work with it. For example:

```ruby
require 'net/http'
http_response = Net::HTTP.get_response('www.example.com' , '/')
````

The code above will return a string with the HTML content of the specified URL. Most of the time we aren't interested in
HTML content, but rather something simpler, such as whether the connection was successful. This can be done by checking
the HTTP response status. For example:

```ruby
require 'net/http'
http_response = Net::HTTP.get_response('www.google.com', '/')
puts http_response.code
# 200
```

We can also get the body of the response using the **body** method.

```ruby
puts http_response.body
```

### Parsing HTTP Response

To parse received data to JSON or XML format:

```ruby
require 'net/http'

require 'uri'
require 'json'

uri = URI('http://www.example.com/sample.json')
response = Net::HTTP.get(uri)
json_response = JSON(response)
```

Here, we are requiring two other modules, **uri** and **json**. The uri module provides classes to handle Uniform
Resource Identifiers (a string of characters that unambiguously identifies a particular resource, like a URL). The json
module is used to parse a JSON string received by another application or generated within your existing application.

There are no less than 25 HTTP clients that [Ruby Toolbox](https://www.ruby-toolbox.com/) offers. We just barely
scratched the surface. We would encourage you to experiment with other HTTP clients as well and pick the one that suits
you best.

### Receiving HTTP Requests

To receive HTTP requests, we need a way to listen to HTTP requests on a network port. For this purpose, we can write our
own HTTP server or choose one from Ruby Toolbox. To keep it simple, let's use **WEBrick**, which is included in the
standard Ruby library and doesn't require any extra installation.

```ruby
require 'webrick'

# specifying port to listen to HTTP requests
http_server = WEBrick::HTTPServer.new(:Port => 3000)

# inheriting the functionality of WEBrick HTTPServlet
class MyHTTPServlet < WEBrick::HTTPServlet::AbstractServlet
  # outputs the requested path
 def do_GET(http_request, http_response)
  http_response.body = "You requested '#{http_request.path}'"
 end
end

http_server.mount('', MyHTTPServlet)
# stop the server using Ctrl-C
trap('INT') {http_server.shutdown}
http_server.start
```

Once the server starts running, we can make requests to the server. For instance,

```bash
curl localhost:3000
# You requested '/'
```
