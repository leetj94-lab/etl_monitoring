import {mkdirSync,cpSync,writeFileSync,readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),files=['index.html','app.js','domain.js','graph.js','network.js','network-ui.js','network.css','style.css'];
const hash=createHash('sha256');
for(const f of files)hash.update(f).update(readFileSync(new URL('src/'+f,root)));
for(const f of readdirSync(new URL('fixtures/',root)).sort())hash.update(f).update(readFileSync(new URL('fixtures/'+f,root)));
const version=hash.digest('hex').slice(0,12);
mkdirSync(new URL('dist/',root),{recursive:true});
for(const f of files){
 const source=readFileSync(new URL('src/'+f,root),'utf8');
 const output=source.replace(/(["'])\.\/((?:fixtures\/)?[\w-]+\.(?:js|css|json))\1/g,(_,quote,path)=>quote+'./'+path+'?v='+version+quote);
 writeFileSync(new URL(f,root),output);writeFileSync(new URL('dist/'+f,root),output);
}
cpSync(new URL('fixtures/',root),new URL('dist/fixtures/',root),{recursive:true});
writeFileSync(new URL('.nojekyll',root),'');writeFileSync(new URL('dist/.nojekyll',root),'');
console.log('Prepared main / (root) publication and dist preview. Asset version: '+version);
