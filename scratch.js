const fs = require('fs');

const content = fs.readFileSync('src/bossfight.md', 'utf-8');
const weeksData = [];

const weekBlocks = content.split(/## Week \d+ — /).slice(1);
weekBlocks.forEach((block, index) => {
  const week_id = index + 1;
  
  const titleMatch = block.match(/(.*?)\n/);
  const bossNameText = titleMatch ? titleMatch[1].trim() : "Unknown Boss";
  
  const challengeMatch = block.match(/> \*(.*?)\*/);
  const challenge = challengeMatch ? challengeMatch[1].trim() : "";
  
  const winConditionMatch = block.match(/### Win Condition\n([\s\S]*?)###/);
  const requirements = [];
  if (winConditionMatch) {
      const reqLines = winConditionMatch[1].trim().split('\n');
      reqLines.forEach(line => {
          if (line.match(/^\d+\./)) {
              requirements.push(line.replace(/^\d+\./, '').trim());
          } else if (line.trim() && !line.match(/---/)) {
              requirements.push(line.trim());
          }
      });
  }
  
  const boss_fight = {
    name: bossNameText.replace(/\*/g, '').trim(),
    description: "A comprehensive test of this week's study.",
    challenge: challenge || "Complete a full integrated project featuring this week's concepts.",
    xp_reward: 1000,
    requirements: requirements.length ? requirements : [`Complete all core tasks in Week ${week_id}`]
  };
  
  const dailyTasks = {};
  const dayBlocks = block.split(/\*\*Day /).slice(1);
  dayBlocks.forEach((dayBlock) => {
      const dayLines = dayBlock.split('\n');
      const firstLine = dayLines[0];
      const titleMatch = firstLine.match(/— (.*?)\*\*/);
      const dayTitle = titleMatch ? titleMatch[1].trim() : "Boss Task";
      
      const dayNumMatch = firstLine.match(/^(\d+)(?:–(\d+))?/);
      let targetDays = [];
      if (dayNumMatch) {
          const startDay = parseInt(dayNumMatch[1]);
          const endDay = dayNumMatch[2] ? parseInt(dayNumMatch[2]) : startDay;
          for(let d = startDay; d <= endDay; d++) {
              targetDays.push(d);
          }
      }
      
      const subtasks = [];
      for (let i = 1; i < dayLines.length; i++) {
          const line = dayLines[i].trim();
          if (line.startsWith('- [ ]')) {
              subtasks.push(line.replace('- [ ]', '').trim());
          }
      }
      
      targetDays.forEach(d => {
          if (!dailyTasks[d]) dailyTasks[d] = [];
          dailyTasks[d].push({
              title: `[Boss] ${dayTitle}`,
              description: `Boss fight preparation: ${dayTitle}`,
              subs: subtasks
          });
      });
  });
  
  weeksData.push({
      boss_fight,
      dailyTasks
  });
});

console.log(JSON.stringify(weeksData[0], null, 2));
