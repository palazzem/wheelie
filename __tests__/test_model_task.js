var IllegalArgument = require('../lib/errors/exceptions').IllegalArgument;
var Task = require('../lib/models/task');

describe('Task model', function() {
  describe('has mandatory fields', function() {
    it('should default empty arguments', function() {
      var fn = function() { task = new Task('name'); };
      expect(fn).not.toThrow();
      expect(task.name).toEqual('name');
      expect(task.dependencies).toEqual([]);
      expect(task.run).toEqual(Task.prototype.run);
      expect(task.config).toEqual(Task.prototype.config);
      expect(task.patches).toEqual([]);
    });

    it('should fail to initialize if the name is missing', function() {
      var fn = function() { new Task(undefined); };
      expect(fn).toThrowError(IllegalArgument, /fields: name/);
    });

    it('should fail to initialize if the dependencies are not an Array', function() {
      var fn = function() { new Task('name', 'not_an_array'); };
      expect(fn).toThrowError(IllegalArgument, /fields: dependencies/);
    });

    it('should fail to initialize if the run argument isn\'t a function', function() {
      var fn = function() { new Task('name', [], 'not_a_function'); };
      expect(fn).toThrowError(IllegalArgument, /fields: run/);
    });

    it('should fail if config() is not a function', function() {
      var task;

      var fn = function() { task = new Task('name', [], function() {}, {'key': 'value'}); };
      expect(fn).toThrowError(IllegalArgument);
    });

    it('should return an undefined reference when calling the "super class" run() method', function() {
      var task = new Task('name', []);
      expect(task.run()).toBe(undefined);
    });

    it('should work with valid arguments but without run() function', function() {
      var task;

      var fn = function() { task = new Task('name', []); };
      expect(fn).not.toThrow();
      expect(task.name).toEqual('name');
      expect(task.dependencies).toEqual([]);
      expect(typeof task.run).toEqual('function');
      expect(task.config()).toEqual({});
    });

    it('should work with valid arguments but without config() function', function() {
      var task;

      var fn = function() { task = new Task('name', [], function() {}); };
      expect(fn).not.toThrow();
      expect(task.name).toEqual('name');
      expect(task.dependencies).toEqual([]);
      expect(typeof task.run).toEqual('function');
      expect(task.config()).toEqual({});
    });

    it('should work with valid arguments', function() {
      var task;

      var config = function() { return {'key': 'value'} };
      var fn = function() { task = new Task('name', [], function() {}, config); };
      expect(fn).not.toThrow();
      expect(task.name).toEqual('name');
      expect(task.dependencies).toEqual([]);
      expect(typeof task.run).toEqual('function');
      expect(typeof task.config).toEqual('function');
      expect(task.config()).toEqual({'key': 'value'});
    });
  });
});
