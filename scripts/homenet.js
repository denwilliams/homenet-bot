const sw = require('../lib/switch');
const cmd = require('../lib/command');
const st = require('../lib/state');
const classes = require('../lib/classes');

module.exports = robot => {
  robot.hear(/set(?: the)? (.*) (\w+) (\w+)/i, (res) => {
    let [line, target, cls, action] = res.match;
    if (target === 'the') return;

    cls = classes[cls];

    setSwtich(cls, target, action, res);
  });

  robot.hear(/(?:set )?(.*) scene/i, (res) => {
    let [line, scene] = res.match;
    setState('scene', scene, res);
  });

  robot.hear(/change(?: the)? scene(?: to)? (.*)/i, (res) => {
    let [line, scene] = res.match;
    setState('scene', scene, res);
  });

  robot.hear(/^sleep\b/i, (res) => {
    let scene = 'sleep';
    setState('scene', scene, res);
  });

  robot.hear(/turn (on|off)(?: the)? (.*) (\w+)/i, (res) => {
    let [line, command, target, cls] = res.match;
    cls = classes[cls];
    if (command === 'on') command = 'turnOn';
    if (command === 'off') command = 'turnOff';
    runCommand(cls, target, command, res);
  });

  robot.hear(/(unlock|lock)(?: the)? (.*)/i, (res) => {
    let cls = 'lock';
    let [line, command, target] = res.match;
    runCommand(cls, target, command, res);
  });
};

function runCommand(cls, target, command, res) {
  target = target.replace(/ /, '');
  const key = cls + '.' + target;
  cmd(key, command);
  res.send('CMD: ' + key + '/' + command);
}

function setSwitch(cls, target, value, res) {
  if (cls === 'light' && value === 'on') value = 'full';
  target = target.replace(/ /, '');
  const key = cls + '.' + target;
  sw(key, value);
  res.send('SW: ' + key + '/' + value);
}

function setState(key, state, res) {
  st(key, state);
  res.send('STATE: ' + key + '/' + state);
}
