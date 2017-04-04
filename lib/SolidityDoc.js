const SolidityStructure = require('solidity-structure');

const Twig = require('twig');

class SolidityDoc {


    generate({source, target}) {

        const structure = SolidityStructure.parseFile(source).toJSON();

        for (let part of ['functions', 'constantFunctions'])
            structure[part] = this.sortByKey(structure[part]);

        Twig.renderFile(__dirname + '/../template/md/contract.md.twig', structure, (err, output) => {
            console.log(output);
        });
    }


    sortByKey(obj) {

        return Object.keys(obj).sort().reduce((sortedObj, key) => Object.assign(sortedObj, {[key]: obj[key]}), {});
    }

}

module.exports = SolidityDoc;
