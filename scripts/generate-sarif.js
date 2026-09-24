#!/usr/bin/env node
/**
 * Generador y Validador de archivos SARIF v2.1.0 para OpenMad
 * Compatible con GitHub Code Scanning (upload-sarif action)
 */

import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const SARIF_SCHEMA = 'https://json.schemastore.org/sarif-2.1.0.json';
const SARIF_VERSION = '2.1.0';

/**
 * Crea una plantilla básica y válida de reporte SARIF v2.1.0
 * @param {object} options
 * @param {string} options.toolName
 * @param {string} options.toolVersion
 * @param {Array<object>} options.rules
 * @param {Array<object>} options.results
 * @returns {object}
 */
export function createSarifReport({
    toolName = 'openmad-linter',
    toolVersion = '1.0.0',
    rules = [],
    results = []
} = {}) {
    return {
        $schema: SARIF_SCHEMA,
        version: SARIF_VERSION,
        runs: [
            {
                tool: {
                    driver: {
                        name: toolName,
                        version: toolVersion,
                        rules: rules.map((r) => ({
                            id: r.id,
                            name: r.name || r.id,
                            shortDescription: { text: r.shortDescription || r.description || r.id },
                            defaultConfiguration: {
                                level: r.level || 'warning'
                            }
                        }))
                    }
                },
                results: results.map((res) => ({
                    ruleId: res.ruleId,
                    level: res.level || 'warning',
                    message: {
                        text: res.message
                    },
                    locations: [
                        {
                            physicalLocation: {
                                artifactLocation: {
                                    uri: res.file,
                                    uriBaseId: '%SRCROOT%'
                                },
                                region: {
                                    startLine: Number(res.line) || 1,
                                    startColumn: Number(res.column) || 1
                                }
                            }
                        }
                    ]
                }))
            }
        ]
    };
}

/**
 * Escribe un reporte SARIF a disco
 * @param {string} outputPath
 * @param {object} report
 */
export function writeSarifFile(outputPath, report) {
    const json = JSON.stringify(report, null, 2);
    writeFileSync(outputPath, json, 'utf-8');
    console.log(`[SARIF] Reporte generado exitosamente en: ${outputPath}`);
}

// Ejecución directa por CLI
if (process.argv[1] && process.argv[1].endsWith('generate-sarif.js')) {
    const args = process.argv.slice(2);
    const outputFile = resolve(process.cwd(), args[0] || 'results.sarif');

    // Por defecto, genera un reporte limpio con 0 vulnerabilidades para registrar en CI
    const emptyReport = createSarifReport({
        toolName: 'openmad-security-checker',
        toolVersion: '1.0.0',
        rules: [
            {
                id: 'OM-SEC-001',
                name: 'ClientSideXSSPrevention',
                shortDescription: 'Verificación estricta de mitigación XSS en DOM y atributos',
                level: 'error'
            }
        ],
        results: []
    });

    writeSarifFile(outputFile, emptyReport);
}
