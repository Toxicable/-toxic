import { exec } from 'child_process';
import { log, colors } from './logger';
import * as SimpleGit from 'simple-git';
const simpleGit = SimpleGit();

export function rebase(numberOfCommits: number) {
  log(colors.FgBlue, `Rebasing last ${numberOfCommits} commits`);

  getCommitMsg(numberOfCommits - 1)
    .then(msg => gitReset(numberOfCommits)
      .then(() => gitCommit(msg))
      .then(() => log(colors.BgBlue, 'Done'))
    );

}

function gitCommit(msg) {
  return new Promise((resolve, reject) => {
    simpleGit.add('.', a => {
      simpleGit.commit(msg, b => resolve(b));
    });
  });
}

function gitReset(n) {
  return new Promise((resolve, reject) => {
    simpleGit.reset(['--soft', `HEAD~${n}`], (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}



function getCommitMsg(n) {
  return new Promise((resolve, reject) => {
    simpleGit.log({ from: `HEAD~${n}`, to: `HEAD~${n + 1}` },
      (err, gitLog) => {
        if (err) {
          reject(err);
        }
        const commitMsg = gitLog.all[0].message;
        resolve(commitMsg);
      }
    );
  });
}
