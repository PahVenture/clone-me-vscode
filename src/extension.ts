import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    console.log('Activating extension "clone"');

    let cloneSubmodule = vscode.commands.registerCommand('clone.cloneSubmodule', async () => {
        console.log('Executing clone.cloneSubmodule command');
        const username = await vscode.window.showInputBox({ prompt: 'Enter username' });
        if (!username) return;

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }

        const clonePath = `.clone-me/${username}-clone`;
        
        cp.exec(`git submodule add --force git@github.com:${username}/clone-me.git ${clonePath}`, 
            { cwd: workspaceFolder.uri.fsPath },
            (error) => {
                if (error) {
                    vscode.window.showErrorMessage(`Failed to clone submodule: ${error.message}`);
                } else {
                    vscode.window.showInformationMessage(`Submodule for ${username} cloned successfully`);
                }
            }
        );
    });

    let refreshSubmodules = vscode.commands.registerCommand('clone.refreshSubmodules', () => {
        console.log('Executing clone.refreshSubmodules command');
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }

        cp.exec('git submodule update --init --recursive', { cwd: workspaceFolder.uri.fsPath }, (error) => {
            if (error) {
                vscode.window.showErrorMessage(`Failed to refresh submodules: ${error.message}`);
            } else {
                vscode.window.showInformationMessage('Submodules refreshed successfully');
            }
        });
    });

    let deleteSubmodule = vscode.commands.registerCommand('clone.deleteSubmodule', async () => {
        console.log('Executing clone.deleteSubmodule command');
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }

        const username = await vscode.window.showInputBox({ prompt: 'Enter username to unfollow' });
        if (!username) return;

        const submodulePath = `${workspaceFolder.uri.fsPath}/.clone-me/${username}-clone`;

        // Execute Git commands to properly remove the submodule
        const commands = [
            `git submodule deinit -f ${submodulePath}`,
            `git rm -f ${submodulePath}`,
            `rm -rf .git/modules/${submodulePath}`,
        ];

        for (const command of commands) {
            try {
                await new Promise((resolve, reject) => {
                    cp.exec(command, { cwd: workspaceFolder.uri.fsPath }, (error, stdout, stderr) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(stdout);
                        }
                    });
                });
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to delete submodule: ${error}`);
                return;
            }
        }

        vscode.window.showInformationMessage(`Submodule for ${username} deleted successfully`);
    });

    context.subscriptions.push(cloneSubmodule, refreshSubmodules, deleteSubmodule);
    console.log('Extension "clone" is now active');
}

export function deactivate() {
    console.log('Extension "clone" is now deactivated');
}