import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import {
  BookOpen, Trophy, ClipboardList, ChevronRight, ChevronDown, Check, X,
  AlertCircle, Microscope, Droplets, CircleDot, Layers, ArrowRight,
  RotateCcw, Copy, CheckCircle2, GraduationCap, Beaker, Info, Zap,
  ShieldAlert, ExternalLink, FlaskConical, Atom
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// TRANSLATIONS — every student-facing string in EN and ES
// ═══════════════════════════════════════════════════════════════════
const translations = {
  // Landing page
  welcome: {
    en: "Welcome to",
    es: "Bienvenido a"
  },
  appTitle: {
    en: "D2: Cells",
    es: "D2: Células"
  },
  appSubtitle: {
    en: "IB Biology — Theme D: Continuity and Change",
    es: "Biología IB — Tema D: Continuidad y Cambio"
  },
  enterName: {
    en: "Enter your name to begin",
    es: "Ingresa tu nombre para comenzar"
  },
  namePlaceholder: {
    en: "Your full name",
    es: "Tu nombre completo"
  },
  startButton: {
    en: "Start Learning",
    es: "Comenzar a aprender"
  },
  // Header / Navigation
  level: {
    en: "Level",
    es: "Nivel"
  },
  learn: {
    en: "Learn",
    es: "Aprender"
  },
  challenge: {
    en: "Challenge",
    es: "Desafío"
  },
  compileSubmit: {
    en: "Compile & Submit",
    es: "Compilar y Enviar"
  },
  hlBadge: {
    en: "HL",
    es: "NS"
  },
  // Learn section
  conceptCheck: {
    en: "Concept Check",
    es: "Verificación de concepto"
  },
  checkAnswer: {
    en: "Check Answer",
    es: "Verificar respuesta"
  },
  correct: {
    en: "Correct!",
    es: "¡Correcto!"
  },
  incorrect: {
    en: "Not quite.",
    es: "No exactamente."
  },
  tryAgain: {
    en: "Try again",
    es: "Intenta de nuevo"
  },
  nextChunk: {
    en: "Continue",
    es: "Continuar"
  },
  interactiveTitle: {
    en: "Interactive Activity",
    es: "Actividad Interactiva"
  },
  reset: {
    en: "Reset",
    es: "Reiniciar"
  },
  // Challenge section
  challengeIntro: {
    en: "Answer each question below using proper IB terminology. Type your response before revealing the model answer.",
    es: "Responde cada pregunta usando terminología IB adecuada. Escribe tu respuesta antes de revelar la respuesta modelo."
  },
  yourAnswer: {
    en: "Type your answer here...",
    es: "Escribe tu respuesta aquí..."
  },
  revealModel: {
    en: "Reveal Model Answer",
    es: "Revelar Respuesta Modelo"
  },
  modelAnswer: {
    en: "Model Answer",
    es: "Respuesta Modelo"
  },
  difficulty: {
    en: "Difficulty",
    es: "Dificultad"
  },
  marks: {
    en: "marks",
    es: "puntos"
  },
  // Compile section
  compileIntro: {
    en: "Click below to compile all of your Challenge responses alongside the model answers. Then copy to clipboard and paste into your Google Doc for submission.",
    es: "Haz clic abajo para compilar todas tus respuestas del Desafío junto con las respuestas modelo. Luego copia al portapapeles y pega en tu Google Doc para entregar."
  },
  compileButton: {
    en: "Compile Responses",
    es: "Compilar Respuestas"
  },
  copyButton: {
    en: "Copy to Clipboard",
    es: "Copiar al Portapapeles"
  },
  copied: {
    en: "Copied!",
    es: "¡Copiado!"
  },
  studentName: {
    en: "Student Name",
    es: "Nombre del Estudiante"
  },
  language: {
    en: "Language",
    es: "Idioma"
  },
  compiledHeader: {
    en: "D2: Cells — Challenge Responses",
    es: "D2: Células — Respuestas del Desafío"
  },
  question: {
    en: "Question",
    es: "Pregunta"
  },
  myResponse: {
    en: "My Response",
    es: "Mi Respuesta"
  },
  notAnswered: {
    en: "[No response entered]",
    es: "[Sin respuesta ingresada]"
  },
  // Related Apps
  relatedApps: {
    en: "Related Interactive Apps",
    es: "Aplicaciones Interactivas Relacionadas"
  },
  relatedAppsSubtitle: {
    en: "Explore these companion apps for deeper practice on key topics covered in this unit.",
    es: "Explora estas aplicaciones complementarias para practicar más a fondo los temas clave de esta unidad."
  },
  // Footer
  footerTheme: {
    en: "IB Biology — Theme D: Continuity and Change — Cells Level",
    es: "Biología IB — Tema D: Continuidad y Cambio — Nivel Celular"
  },
  footerBiozone: {
    en: "Biozone Sections: 443–469",
    es: "Secciones de Biozone: 443–469"
  },

  // ─── LEARN SECTION CONTENT ──────────────────────────────────────
  // Chunk 1: Cell Division — Mitosis & the Cell Cycle
  chunk1Title: {
    en: "Cell Division — Mitosis & the Cell Cycle",
    es: "División Celular — Mitosis y el Ciclo Celular"
  },
  chunk1Content: {
    en: `**The cell cycle** is the sequence of events between one cell division and the next. It consists of **interphase** (the longest phase) and **mitotic phase** (M phase).

**Interphase** is divided into three stages:
• **G₁ (Gap 1)** — the cell grows, produces proteins and organelles, and carries out its normal functions. This is the main growth phase.
• **S (Synthesis)** — DNA replication occurs. Each chromosome is copied to produce two identical **sister chromatids** joined at the **centromere**. The cell now has double its DNA content.
• **G₂ (Gap 2)** — the cell continues to grow and produces proteins needed for mitosis (e.g., tubulin for the spindle fibers). Organelles are replicated.

**Mitosis** produces two genetically identical daughter cells from one parent cell. It is used for:
• **Growth** — increasing the number of cells in a developing organism
• **Repair** — replacing damaged or dead cells (e.g., skin cells, blood cells)
• **Asexual reproduction** — producing genetically identical offspring (e.g., budding in yeast, binary fission in bacteria is similar in outcome though not technically mitosis)

**The stages of mitosis:**

**Prophase:**
• Chromosomes condense and become visible as short, thick structures
• Each chromosome consists of two sister chromatids joined at the centromere
• The nuclear membrane begins to break down
• Centrioles (in animal cells) move to opposite poles and spindle fibers begin to form

**Metaphase:**
• Chromosomes line up along the **metaphase plate** (the equator of the cell)
• Spindle fibers from each pole attach to the centromere of each chromosome
• This ensures each daughter cell will receive one copy of each chromosome

**Anaphase:**
• The centromeres split and sister chromatids are pulled apart to opposite poles by the shortening of spindle fibers
• The cell begins to elongate
• Each separated chromatid is now called a chromosome

**Telophase:**
• Chromosomes arrive at opposite poles and begin to decondense
• Nuclear membranes reform around each set of chromosomes
• Spindle fibers disassemble
• The cell now contains two nuclei, each with a complete set of chromosomes

**Cytokinesis** — division of the cytoplasm — occurs simultaneously with or just after telophase:
• In animal cells: a **cleavage furrow** forms and pinches the cell in two
• In plant cells: a **cell plate** forms across the middle and develops into a new cell wall

**The mitotic index** is the proportion of cells in a tissue sample that are undergoing mitosis:
Mitotic index = number of cells in mitosis ÷ total number of cells observed
A high mitotic index indicates rapid cell division — it can be used to identify cancerous tissue (tumors have a high mitotic index) or regions of active growth (e.g., root tips).`,
    es: `**El ciclo celular** es la secuencia de eventos entre una división celular y la siguiente. Consiste en **interfase** (la fase más larga) y **fase mitótica** (fase M).

**La interfase** se divide en tres etapas:
• **G₁ (Intervalo 1)** — la célula crece, produce proteínas y orgánulos, y realiza sus funciones normales. Esta es la fase principal de crecimiento.
• **S (Síntesis)** — ocurre la replicación del ADN. Cada cromosoma se copia para producir dos **cromátidas hermanas** idénticas unidas en el **centrómero**. La célula ahora tiene el doble de su contenido de ADN.
• **G₂ (Intervalo 2)** — la célula continúa creciendo y produce proteínas necesarias para la mitosis (ej., tubulina para las fibras del huso). Los orgánulos se replican.

**La mitosis** produce dos células hijas genéticamente idénticas a partir de una célula madre. Se usa para:
• **Crecimiento** — aumentar el número de células en un organismo en desarrollo
• **Reparación** — reemplazar células dañadas o muertas (ej., células de la piel, células sanguíneas)
• **Reproducción asexual** — producir descendencia genéticamente idéntica (ej., gemación en levaduras, la fisión binaria en bacterias es similar en resultado aunque técnicamente no es mitosis)

**Las etapas de la mitosis:**

**Profase:**
• Los cromosomas se condensan y se hacen visibles como estructuras cortas y gruesas
• Cada cromosoma consiste en dos cromátidas hermanas unidas en el centrómero
• La membrana nuclear comienza a desintegrarse
• Los centriolos (en células animales) se mueven a polos opuestos y las fibras del huso comienzan a formarse

**Metafase:**
• Los cromosomas se alinean a lo largo de la **placa metafásica** (el ecuador de la célula)
• Las fibras del huso de cada polo se unen al centrómero de cada cromosoma
• Esto asegura que cada célula hija recibirá una copia de cada cromosoma

**Anafase:**
• Los centrómeros se dividen y las cromátidas hermanas son haladas a polos opuestos por el acortamiento de las fibras del huso
• La célula comienza a elongarse
• Cada cromátida separada ahora se llama cromosoma

**Telofase:**
• Los cromosomas llegan a polos opuestos y comienzan a descondensarse
• Las membranas nucleares se reforman alrededor de cada conjunto de cromosomas
• Las fibras del huso se desensamblan
• La célula ahora contiene dos núcleos, cada uno con un conjunto completo de cromosomas

**Citocinesis** — división del citoplasma — ocurre simultáneamente con o justo después de la telofase:
• En células animales: se forma un **surco de división** que estrangula la célula en dos
• En células vegetales: se forma una **placa celular** a través del medio que se desarrolla en una nueva pared celular

**El índice mitótico** es la proporción de células en una muestra de tejido que están experimentando mitosis:
Índice mitótico = número de células en mitosis ÷ número total de células observadas
Un alto índice mitótico indica división celular rápida — se puede usar para identificar tejido canceroso (los tumores tienen un alto índice mitótico) o regiones de crecimiento activo (ej., puntas de raíces).`
  },
  chunk1CC1Question: {
    en: "Which of the following correctly describes what happens during the S phase of interphase?",
    es: "¿Cuál de las siguientes describe correctamente lo que sucede durante la fase S de la interfase?"
  },
  chunk1CC1Options: {
    en: ["The cell divides into two daughter cells", "DNA replication occurs, producing sister chromatids", "Chromosomes condense and become visible", "The cell grows and produces proteins for normal function"],
    es: ["La célula se divide en dos células hijas", "Ocurre la replicación del ADN, produciendo cromátidas hermanas", "Los cromosomas se condensan y se hacen visibles", "La célula crece y produce proteínas para funciones normales"]
  },
  chunk1CC1Correct: { en: 1, es: 1 },
  chunk1CC1Explanation: {
    en: "During S (Synthesis) phase, DNA replication occurs. Each chromosome is copied, producing two identical sister chromatids joined at the centromere. Cell division (option A) occurs during the M phase, chromosome condensation (option C) occurs during prophase, and general cell growth (option D) describes G₁ phase.",
    es: "Durante la fase S (Síntesis), ocurre la replicación del ADN. Cada cromosoma se copia, produciendo dos cromátidas hermanas idénticas unidas en el centrómero. La división celular (opción A) ocurre durante la fase M, la condensación cromosómica (opción C) ocurre durante la profase, y el crecimiento celular general (opción D) describe la fase G₁."
  },

  // Chunk 2: Meiosis & Genetic Variation (HL)
  chunk2Title: {
    en: "Meiosis & Genetic Variation",
    es: "Meiosis y Variación Genética"
  },
  chunk2Content: {
    en: `**Meiosis** is a type of cell division that produces **four genetically different haploid cells** (gametes) from one diploid parent cell. It is essential for sexual reproduction and is a major source of genetic variation.

**Key differences between mitosis and meiosis:**
• Mitosis: 1 division → 2 identical diploid cells; meiosis: 2 divisions → 4 genetically different haploid cells
• Mitosis: no crossing over, no independent assortment of homologous pairs; meiosis: both occur
• Mitosis: for growth and repair; meiosis: for gamete production
• Mitosis: daughter cells are genetically identical to parent; meiosis: daughter cells are genetically unique

**Meiosis I (reduction division) — separates homologous pairs:**

**Prophase I:**
• Homologous chromosomes pair up in a process called **synapsis**, forming **bivalents** (tetrads)
• **Crossing over** occurs: non-sister chromatids of homologous chromosomes exchange segments of DNA at points called **chiasmata** (singular: chiasma). This recombines alleles and creates new combinations of genes on each chromosome — a major source of genetic variation.
• The nuclear membrane breaks down and spindle fibers form.

**Metaphase I:**
• Bivalents (homologous pairs) line up at the metaphase plate
• The orientation of each pair is random — this is **independent assortment**. For each pair, either the maternal or paternal chromosome can face either pole. With n pairs of chromosomes, there are **2ⁿ possible arrangements** (in humans, n = 23, so 2²³ = 8,388,608 possible combinations).

**Anaphase I:**
• Homologous chromosomes are pulled to opposite poles (note: sister chromatids stay together — this is different from mitosis)
• Each pole receives one chromosome from each homologous pair (the cell goes from diploid to haploid)

**Telophase I + Cytokinesis:**
• Two haploid cells are formed, each containing one chromosome from each homologous pair
• Each chromosome still consists of two sister chromatids

**Meiosis II (similar to mitosis):**

**Prophase II** → chromosomes condense, spindle forms
**Metaphase II** → chromosomes line up individually at the metaphase plate
**Anaphase II** → centromeres split and sister chromatids are pulled to opposite poles
**Telophase II + Cytokinesis** → four haploid daughter cells are formed

**Sources of genetic variation in meiosis:**
1. **Crossing over** (prophase I) — creates recombinant chromosomes with new allele combinations
2. **Independent assortment** (metaphase I) — random orientation of homologous pairs produces 2ⁿ combinations
3. **Random fertilization** — any gamete can fuse with any other gamete from the other parent

Together, these three mechanisms ensure that every gamete — and therefore every offspring produced by sexual reproduction — is genetically unique. This variation is the raw material upon which natural selection acts.

**Non-disjunction** is the failure of chromosomes to separate properly during meiosis. If homologous chromosomes fail to separate in meiosis I, or sister chromatids fail to separate in meiosis II, the resulting gametes will have an abnormal number of chromosomes. When such a gamete is fertilized, the offspring has **aneuploidy** (an abnormal chromosome number).

Examples:
• **Down syndrome (trisomy 21)** — three copies of chromosome 21, caused by non-disjunction of chromosome 21 during meiosis
• **Turner syndrome (monosomy X, 45,X)** — only one X chromosome in females
• **Klinefelter syndrome (47,XXY)** — extra X chromosome in males`,
    es: `**La meiosis** es un tipo de división celular que produce **cuatro células haploides genéticamente diferentes** (gametos) a partir de una célula madre diploide. Es esencial para la reproducción sexual y es una fuente importante de variación genética.

**Diferencias clave entre mitosis y meiosis:**
• Mitosis: 1 división → 2 células diploides idénticas; meiosis: 2 divisiones → 4 células haploides genéticamente diferentes
• Mitosis: sin entrecruzamiento, sin distribución independiente de pares homólogos; meiosis: ambos ocurren
• Mitosis: para crecimiento y reparación; meiosis: para producción de gametos
• Mitosis: células hijas genéticamente idénticas a la madre; meiosis: células hijas genéticamente únicas

**Meiosis I (división reduccional) — separa pares homólogos:**

**Profase I:**
• Los cromosomas homólogos se emparejan en un proceso llamado **sinapsis**, formando **bivalentes** (tétradas)
• Ocurre el **entrecruzamiento**: las cromátidas no hermanas de cromosomas homólogos intercambian segmentos de ADN en puntos llamados **quiasmas** (singular: quiasma). Esto recombina alelos y crea nuevas combinaciones de genes en cada cromosoma — una fuente importante de variación genética.
• La membrana nuclear se desintegra y se forman las fibras del huso.

**Metafase I:**
• Los bivalentes (pares homólogos) se alinean en la placa metafásica
• La orientación de cada par es aleatoria — esto es la **distribución independiente**. Para cada par, el cromosoma materno o paterno puede enfrentar cualquier polo. Con n pares de cromosomas, hay **2ⁿ arreglos posibles** (en humanos, n = 23, entonces 2²³ = 8,388,608 combinaciones posibles).

**Anafase I:**
• Los cromosomas homólogos son halados a polos opuestos (nota: las cromátidas hermanas permanecen juntas — esto es diferente de la mitosis)
• Cada polo recibe un cromosoma de cada par homólogo (la célula pasa de diploide a haploide)

**Telofase I + Citocinesis:**
• Se forman dos células haploides, cada una conteniendo un cromosoma de cada par homólogo
• Cada cromosoma aún consiste en dos cromátidas hermanas

**Meiosis II (similar a la mitosis):**

**Profase II** → los cromosomas se condensan, se forma el huso
**Metafase II** → los cromosomas se alinean individualmente en la placa metafásica
**Anafase II** → los centrómeros se dividen y las cromátidas hermanas son haladas a polos opuestos
**Telofase II + Citocinesis** → se forman cuatro células hijas haploides

**Fuentes de variación genética en la meiosis:**
1. **Entrecruzamiento** (profase I) — crea cromosomas recombinantes con nuevas combinaciones de alelos
2. **Distribución independiente** (metafase I) — la orientación aleatoria de pares homólogos produce 2ⁿ combinaciones
3. **Fecundación aleatoria** — cualquier gameto puede fusionarse con cualquier otro gameto del otro progenitor

Juntos, estos tres mecanismos aseguran que cada gameto — y por lo tanto cada descendiente producido por reproducción sexual — sea genéticamente único. Esta variación es la materia prima sobre la cual actúa la selección natural.

**La no disyunción** es la falla de los cromosomas para separarse correctamente durante la meiosis. Si los cromosomas homólogos no se separan en la meiosis I, o las cromátidas hermanas no se separan en la meiosis II, los gametos resultantes tendrán un número anormal de cromosomas. Cuando dicho gameto es fecundado, el descendiente tiene **aneuploidía** (un número cromosómico anormal).

Ejemplos:
• **Síndrome de Down (trisomía 21)** — tres copias del cromosoma 21, causado por no disyunción del cromosoma 21 durante la meiosis
• **Síndrome de Turner (monosomía X, 45,X)** — solo un cromosoma X en mujeres
• **Síndrome de Klinefelter (47,XXY)** — cromosoma X extra en varones`
  },
  chunk2CC1Question: {
    en: "Explain why crossing over during meiosis I is important for generating genetic variation.",
    es: "Explica por qué el entrecruzamiento durante la meiosis I es importante para generar variación genética."
  },
  chunk2CC1Answer: {
    en: "During prophase I, homologous chromosomes pair up and non-sister chromatids exchange segments of DNA at chiasmata (crossing over). This recombines alleles that were previously on the same chromosome, creating new combinations of alleles on each chromatid. As a result, the gametes produced contain chromosomes with unique allele combinations that differ from both parental chromosomes. Without crossing over, alleles on the same chromosome would always be inherited together. Crossing over increases the possible genetic combinations in gametes beyond what independent assortment alone provides, contributing to the genetic uniqueness of every individual produced by sexual reproduction.",
    es: "Durante la profase I, los cromosomas homólogos se emparejan y las cromátidas no hermanas intercambian segmentos de ADN en los quiasmas (entrecruzamiento). Esto recombina alelos que estaban previamente en el mismo cromosoma, creando nuevas combinaciones de alelos en cada cromátida. Como resultado, los gametos producidos contienen cromosomas con combinaciones únicas de alelos que difieren de ambos cromosomas parentales. Sin entrecruzamiento, los alelos en el mismo cromosoma siempre se heredarían juntos. El entrecruzamiento aumenta las posibles combinaciones genéticas en los gametos más allá de lo que la distribución independiente sola proporciona, contribuyendo a la singularidad genética de cada individuo producido por reproducción sexual."
  },

  // Chunk 3: Cell Cycle Regulation & Cancer (HL)
  chunk3Title: {
    en: "Cell Cycle Regulation & Cancer",
    es: "Regulación del Ciclo Celular y Cáncer"
  },
  chunk3Content: {
    en: `The cell cycle is tightly regulated to ensure that cells divide only when appropriate. **Checkpoints** act as quality control gates — they monitor conditions and halt the cell cycle if problems are detected.

**Key checkpoints:**
• **G₁ checkpoint (restriction point)** — checks whether the cell is large enough, has sufficient nutrients and growth factors, and whether the DNA is undamaged. If conditions are not met, the cell enters **G₀** (a quiescent, non-dividing state). Many cells in the body remain in G₀ permanently (e.g., mature neurons, muscle cells).
• **G₂ checkpoint** — checks that all DNA has been successfully replicated and checks for DNA damage. If errors are detected, the cell cycle is paused for repair.
• **Metaphase checkpoint (spindle assembly checkpoint)** — checks that all chromosomes are properly attached to spindle fibers at the metaphase plate before allowing anaphase to proceed. This prevents unequal distribution of chromosomes.

**Cyclins and cyclin-dependent kinases (CDKs):**
• The cell cycle is driven forward by **CDKs** — enzymes that are only active when bound to their partner **cyclin** proteins.
• Different cyclins accumulate at different phases: cyclin D in G₁, cyclin E at the G₁/S transition, cyclin A in S phase, and cyclin B in G₂/M.
• When a cyclin binds to its CDK, the activated complex phosphorylates target proteins that push the cell into the next phase.
• Cyclins are synthesized and degraded in a precisely timed cycle, ensuring that each phase occurs in the correct order and for the correct duration.

**Tumor suppressors and oncogenes:**
• **Tumor suppressor genes** encode proteins that inhibit cell division or promote apoptosis (programmed cell death). They act as "brakes" on the cell cycle.
  – **p53** is the most important tumor suppressor — called the "guardian of the genome." When DNA damage is detected, p53 activates DNA repair proteins, halts the cell cycle at the G₁ checkpoint to allow repair, and triggers apoptosis if the damage is irreparable. Mutations in p53 are found in over 50% of human cancers.
  – **Rb (retinoblastoma protein)** — blocks the G₁/S transition until the cell receives appropriate growth signals.
• **Proto-oncogenes** are normal genes that promote cell growth and division (e.g., genes for growth factors, growth factor receptors, signal transduction proteins). When mutated, they become **oncogenes** — permanently active versions that drive uncontrolled cell division.

**Cancer** develops when mutations accumulate in genes that regulate the cell cycle. Typically, multiple mutations are needed (the "multi-hit hypothesis"):
• Gain-of-function mutations in proto-oncogenes → oncogenes (accelerators stuck on)
• Loss-of-function mutations in tumor suppressor genes → loss of braking (loss of checkpoints)
• The result: uncontrolled cell division, forming a **tumor** (mass of abnormal cells)

**Benign tumors** remain localized and do not invade surrounding tissues. **Malignant tumors** (cancers) invade surrounding tissues and can spread to distant sites through the blood or lymph — this is **metastasis**.

**Mutagens and carcinogens:**
• **Mutagens** are agents that increase the rate of mutation (e.g., UV radiation, X-rays, certain chemicals like benzene)
• **Carcinogens** are agents that cause cancer (all carcinogens are mutagens, but not all mutagens are carcinogens). Examples: tobacco smoke (contains over 70 carcinogens), UV radiation, asbestos, alcohol, processed meat.

**Apoptosis** (programmed cell death) is a controlled, orderly process by which damaged or unwanted cells self-destruct. It is essential for:
• Removing cells with irreparable DNA damage (preventing cancer)
• Sculpting tissues during development (e.g., removing webbing between fingers)
• Eliminating virus-infected cells
Unlike necrosis (uncontrolled cell death from injury), apoptosis does not cause inflammation — the cell is neatly dismantled and recycled.`,
    es: `El ciclo celular está estrictamente regulado para asegurar que las células se dividan solo cuando sea apropiado. Los **puntos de control** actúan como puertas de control de calidad — monitorean las condiciones y detienen el ciclo celular si se detectan problemas.

**Puntos de control clave:**
• **Punto de control G₁ (punto de restricción)** — verifica si la célula es lo suficientemente grande, tiene suficientes nutrientes y factores de crecimiento, y si el ADN no está dañado. Si las condiciones no se cumplen, la célula entra en **G₀** (un estado quiescente, sin división). Muchas células del cuerpo permanecen en G₀ permanentemente (ej., neuronas maduras, células musculares).
• **Punto de control G₂** — verifica que todo el ADN se haya replicado exitosamente y busca daños en el ADN. Si se detectan errores, el ciclo celular se pausa para reparación.
• **Punto de control de metafase (punto de control del ensamblaje del huso)** — verifica que todos los cromosomas estén correctamente unidos a las fibras del huso en la placa metafásica antes de permitir que proceda la anafase. Esto previene la distribución desigual de cromosomas.

**Ciclinas y quinasas dependientes de ciclinas (CDKs):**
• El ciclo celular es impulsado por **CDKs** — enzimas que solo están activas cuando están unidas a sus proteínas **ciclinas** compañeras.
• Diferentes ciclinas se acumulan en diferentes fases: ciclina D en G₁, ciclina E en la transición G₁/S, ciclina A en fase S, y ciclina B en G₂/M.
• Cuando una ciclina se une a su CDK, el complejo activado fosforila proteínas diana que empujan a la célula a la siguiente fase.
• Las ciclinas se sintetizan y degradan en un ciclo precisamente cronometrado, asegurando que cada fase ocurra en el orden correcto y por la duración correcta.

**Supresores tumorales y oncogenes:**
• **Los genes supresores de tumores** codifican proteínas que inhiben la división celular o promueven la apoptosis (muerte celular programada). Actúan como "frenos" del ciclo celular.
  – **p53** es el supresor tumoral más importante — llamado el "guardián del genoma." Cuando se detecta daño en el ADN, p53 activa proteínas de reparación del ADN, detiene el ciclo celular en el punto de control G₁ para permitir la reparación, y desencadena la apoptosis si el daño es irreparable. Las mutaciones en p53 se encuentran en más del 50% de los cánceres humanos.
  – **Rb (proteína del retinoblastoma)** — bloquea la transición G₁/S hasta que la célula recibe señales de crecimiento apropiadas.
• **Los proto-oncogenes** son genes normales que promueven el crecimiento y la división celular (ej., genes para factores de crecimiento, receptores de factores de crecimiento, proteínas de transducción de señales). Cuando mutan, se convierten en **oncogenes** — versiones permanentemente activas que impulsan la división celular descontrolada.

**El cáncer** se desarrolla cuando las mutaciones se acumulan en genes que regulan el ciclo celular. Típicamente, se necesitan múltiples mutaciones (la "hipótesis de múltiples impactos"):
• Mutaciones de ganancia de función en proto-oncogenes → oncogenes (aceleradores atascados)
• Mutaciones de pérdida de función en genes supresores de tumores → pérdida de frenado (pérdida de puntos de control)
• El resultado: división celular descontrolada, formando un **tumor** (masa de células anormales)

**Los tumores benignos** permanecen localizados y no invaden tejidos circundantes. **Los tumores malignos** (cánceres) invaden tejidos circundantes y pueden extenderse a sitios distantes a través de la sangre o la linfa — esto es **metástasis**.

**Mutágenos y carcinógenos:**
• **Los mutágenos** son agentes que aumentan la tasa de mutación (ej., radiación UV, rayos X, ciertos químicos como el benceno)
• **Los carcinógenos** son agentes que causan cáncer (todos los carcinógenos son mutágenos, pero no todos los mutágenos son carcinógenos). Ejemplos: humo de tabaco (contiene más de 70 carcinógenos), radiación UV, asbesto, alcohol, carne procesada.

**La apoptosis** (muerte celular programada) es un proceso controlado y ordenado por el cual las células dañadas o no deseadas se autodestruyen. Es esencial para:
• Eliminar células con daño irreparable en el ADN (previniendo el cáncer)
• Esculpir tejidos durante el desarrollo (ej., eliminar membranas entre los dedos)
• Eliminar células infectadas por virus
A diferencia de la necrosis (muerte celular descontrolada por lesión), la apoptosis no causa inflamación — la célula es desmantelada y reciclada ordenadamente.`
  },
  chunk3CC1Question: {
    en: "Which of the following best describes the role of p53 in preventing cancer?",
    es: "¿Cuál de las siguientes describe mejor el papel de p53 en la prevención del cáncer?"
  },
  chunk3CC1Options: {
    en: ["p53 is an oncogene that promotes cell division", "p53 detects DNA damage, halts the cell cycle for repair, and triggers apoptosis if repair fails", "p53 is a cyclin that drives the cell from G₁ to S phase", "p53 promotes metastasis of damaged cells"],
    es: ["p53 es un oncogén que promueve la división celular", "p53 detecta daño en el ADN, detiene el ciclo celular para reparación, y desencadena apoptosis si la reparación falla", "p53 es una ciclina que impulsa la célula de G₁ a fase S", "p53 promueve la metástasis de células dañadas"]
  },
  chunk3CC1Correct: { en: 1, es: 1 },
  chunk3CC1Explanation: {
    en: "p53 is a tumor suppressor protein — the 'guardian of the genome.' When it detects DNA damage, it activates DNA repair mechanisms and halts the cell cycle at the G₁ checkpoint. If the damage cannot be repaired, p53 triggers apoptosis (programmed cell death) to prevent the damaged cell from dividing and potentially becoming cancerous. Mutations in p53 that disable this protective function are found in over 50% of all human cancers.",
    es: "p53 es una proteína supresora de tumores — el 'guardián del genoma.' Cuando detecta daño en el ADN, activa mecanismos de reparación del ADN y detiene el ciclo celular en el punto de control G₁. Si el daño no puede repararse, p53 desencadena la apoptosis (muerte celular programada) para prevenir que la célula dañada se divida y potencialmente se vuelva cancerosa. Las mutaciones en p53 que deshabilitan esta función protectora se encuentran en más del 50% de todos los cánceres humanos."
  },

  // Chunk 4: Gene Expression, Regulation & Epigenetics
  chunk4Title: {
    en: "Gene Expression, Regulation & Epigenetics",
    es: "Expresión Génica, Regulación y Epigenética"
  },
  chunk4Content: {
    en: `**Gene expression** is the process by which the information in a gene is used to produce a functional product — usually a protein. It involves two main stages:

1. **Transcription** — the DNA sequence of a gene is copied into messenger RNA (mRNA) in the nucleus. RNA polymerase binds to the promoter region and synthesizes mRNA using the template strand.
2. **Translation** — the mRNA is read by ribosomes in the cytoplasm, and transfer RNA (tRNA) molecules bring the corresponding amino acids, building a polypeptide chain.

Not all genes are expressed in every cell at all times. **Gene regulation** determines which genes are turned on or off in a particular cell, at a particular time. This is essential for:
• **Cell differentiation** — all cells contain the same DNA, but different cell types (muscle, nerve, skin) express different subsets of genes
• **Responding to environmental changes** — cells can adjust gene expression in response to signals (hormones, temperature, nutrients)

**Mechanisms of gene regulation:**

**Transcription factors** are proteins that bind to specific DNA sequences (promoters, enhancers, or silencers) to regulate whether a gene is transcribed:
• **Activators** enhance transcription by helping RNA polymerase bind to the promoter
• **Repressors** block transcription by preventing RNA polymerase from binding
• Signals such as hormones can activate or deactivate transcription factors

**Epigenetics** refers to heritable changes in gene expression that do NOT involve changes to the DNA base sequence. Epigenetic modifications control whether genes are accessible for transcription.

**Key epigenetic mechanisms:**

**1. DNA methylation:**
• Methyl groups (–CH₃) are added to cytosine bases, typically at **CpG sites** (where cytosine is followed by guanine)
• Methylation of a gene's **promoter region** prevents transcription factors from binding → the gene is **silenced**
• Methylation patterns are copied during DNA replication → they are **heritable** (passed to daughter cells)
• Example: **X-inactivation** in female mammals — one X chromosome is heavily methylated and condensed into a **Barr body**, silencing most of its genes

**2. Histone modification:**
• DNA is wrapped around histone proteins to form **nucleosomes** (the basic unit of chromatin)
• **Histone acetylation** — acetyl groups are added to histone tails, reducing their positive charge and loosening their grip on DNA → chromatin opens (**euchromatin**) → genes are **accessible** for transcription
• **Histone deacetylation** — removal of acetyl groups → chromatin compacts (**heterochromatin**) → genes are **silenced**
• Other modifications (methylation, phosphorylation of histones) also affect chromatin structure

**Environmental influences on epigenetics:**
• Diet, stress, toxins, and lifestyle can alter epigenetic marks
• Some epigenetic changes can be passed to offspring — **transgenerational epigenetic inheritance**
• Example: Studies on famine exposure show that nutritional stress in parents can affect gene expression patterns in children and grandchildren
• **Genomic imprinting** — certain genes are epigenetically marked depending on which parent they were inherited from, so only the maternal or paternal copy is expressed`,
    es: `**La expresión génica** es el proceso por el cual la información de un gen se utiliza para producir un producto funcional — generalmente una proteína. Involucra dos etapas principales:

1. **Transcripción** — la secuencia de ADN de un gen se copia en ARN mensajero (ARNm) en el núcleo. La ARN polimerasa se une a la región promotora y sintetiza ARNm usando la hebra molde.
2. **Traducción** — el ARNm es leído por los ribosomas en el citoplasma, y las moléculas de ARN de transferencia (ARNt) traen los aminoácidos correspondientes, construyendo una cadena polipeptídica.

No todos los genes se expresan en cada célula en todo momento. **La regulación génica** determina qué genes se activan o desactivan en una célula particular, en un momento particular. Esto es esencial para:
• **Diferenciación celular** — todas las células contienen el mismo ADN, pero diferentes tipos celulares (músculo, nervio, piel) expresan diferentes subconjuntos de genes
• **Respuesta a cambios ambientales** — las células pueden ajustar la expresión génica en respuesta a señales (hormonas, temperatura, nutrientes)

**Mecanismos de regulación génica:**

**Los factores de transcripción** son proteínas que se unen a secuencias específicas de ADN (promotores, potenciadores o silenciadores) para regular si un gen se transcribe:
• **Los activadores** mejoran la transcripción ayudando a la ARN polimerasa a unirse al promotor
• **Los represores** bloquean la transcripción impidiendo que la ARN polimerasa se una
• Señales como las hormonas pueden activar o desactivar factores de transcripción

**La epigenética** se refiere a cambios heredables en la expresión génica que NO involucran cambios en la secuencia de bases del ADN. Las modificaciones epigenéticas controlan si los genes son accesibles para la transcripción.

**Mecanismos epigenéticos clave:**

**1. Metilación del ADN:**
• Se añaden grupos metilo (–CH₃) a las bases de citosina, típicamente en **sitios CpG** (donde la citosina es seguida por guanina)
• La metilación de la **región promotora** de un gen impide que los factores de transcripción se unan → el gen es **silenciado**
• Los patrones de metilación se copian durante la replicación del ADN → son **heredables** (pasan a las células hijas)
• Ejemplo: **Inactivación del X** en mamíferos hembra — un cromosoma X está fuertemente metilado y condensado en un **cuerpo de Barr**, silenciando la mayoría de sus genes

**2. Modificación de histonas:**
• El ADN está enrollado alrededor de proteínas histonas para formar **nucleosomas** (la unidad básica de la cromatina)
• **Acetilación de histonas** — se añaden grupos acetilo a las colas de histonas, reduciendo su carga positiva y aflojando su agarre sobre el ADN → la cromatina se abre (**eucromatina**) → los genes son **accesibles** para la transcripción
• **Desacetilación de histonas** — eliminación de grupos acetilo → la cromatina se compacta (**heterocromatina**) → los genes son **silenciados**
• Otras modificaciones (metilación, fosforilación de histonas) también afectan la estructura de la cromatina

**Influencias ambientales en la epigenética:**
• La dieta, el estrés, las toxinas y el estilo de vida pueden alterar las marcas epigenéticas
• Algunos cambios epigenéticos pueden transmitirse a la descendencia — **herencia epigenética transgeneracional**
• Ejemplo: Estudios sobre exposición a hambruna muestran que el estrés nutricional en los padres puede afectar los patrones de expresión génica en hijos y nietos
• **Impronta genómica** — ciertos genes están marcados epigenéticamente dependiendo de qué progenitor fueron heredados, de modo que solo la copia materna o paterna se expresa`
  },
  chunk4CC1Question: {
    en: "Which of the following best describes how DNA methylation affects gene expression?",
    es: "¿Cuál de las siguientes describe mejor cómo la metilación del ADN afecta la expresión génica?"
  },
  chunk4CC1Options: {
    en: ["It adds methyl groups to histone proteins to open chromatin", "It adds methyl groups to cytosine bases at promoter regions, preventing transcription factor binding", "It removes acetyl groups from DNA, making it more compact", "It changes the DNA base sequence to silence the gene"],
    es: ["Añade grupos metilo a las proteínas histonas para abrir la cromatina", "Añade grupos metilo a las bases de citosina en regiones promotoras, impidiendo la unión de factores de transcripción", "Elimina grupos acetilo del ADN, haciéndolo más compacto", "Cambia la secuencia de bases del ADN para silenciar el gen"]
  },
  chunk4CC1Correct: { en: 1, es: 1 },
  chunk4CC1Explanation: {
    en: "DNA methylation involves adding methyl groups (–CH₃) to cytosine bases, typically at CpG sites in the promoter region of a gene. This methylation physically blocks transcription factors from binding to the promoter, which prevents RNA polymerase from initiating transcription — effectively silencing the gene. Importantly, methylation does NOT change the DNA base sequence; it is an epigenetic modification.",
    es: "La metilación del ADN implica añadir grupos metilo (–CH₃) a las bases de citosina, típicamente en sitios CpG en la región promotora de un gen. Esta metilación bloquea físicamente la unión de factores de transcripción al promotor, lo que impide que la ARN polimerasa inicie la transcripción — silenciando efectivamente el gen. Importante: la metilación NO cambia la secuencia de bases del ADN; es una modificación epigenética."
  },

  // Chunk 5: Determining the Rate of Growth
  chunk5Title: {
    en: "Determining the Rate of Growth",
    es: "Determinación de la Tasa de Crecimiento"
  },
  chunk5Content: {
    en: `**Growth** in biological terms refers to an irreversible increase in the size or mass of an organism. At the cellular level, growth occurs through cell division (increasing cell number) and cell enlargement (increasing cell size). Growth can be measured in several ways:

**Methods of measuring growth:**
• **Dry mass** — the most accurate measure of growth because it excludes water (which fluctuates). Organisms are dried in an oven until constant mass is achieved. Disadvantage: the organism must be killed.
• **Wet (fresh) mass** — easier to measure but less reliable because water content varies with hydration, time of day, and recent feeding.
• **Length/height** — simple to measure in many organisms but does not account for growth in other dimensions.
• **Cell number** — useful for unicellular organisms and cell cultures, counted using a hemocytometer or estimated by serial dilution and plating.

**Growth curves:**

When growth is plotted over time, organisms typically show a **sigmoid (S-shaped) growth curve** with distinct phases:

**1. Lag phase** — initially slow growth as the organism adjusts to its environment, synthesizes enzymes, and prepares cellular machinery for rapid division. Few new cells are produced.

**2. Exponential (log) phase** — rapid, unrestricted growth. The population or organism doubles at a constant rate. Resources are abundant and waste products have not accumulated. This is the phase of maximum growth rate.

**3. Stationary (plateau) phase** — growth rate slows and eventually reaches zero. The rate of new cell production equals the rate of cell death. This occurs because:
• Nutrients become limiting
• Waste products accumulate to toxic levels
• Space becomes limited
• In multicellular organisms, growth signals (hormones) decline as the organism reaches its genetically determined adult size

**4. Decline phase** (in populations) — death rate exceeds reproduction rate; population size decreases.

**Calculating growth rate:**

**Absolute growth rate** = change in size ÷ change in time
• Example: A plant grows from 10 cm to 25 cm in 5 days → absolute growth rate = (25 − 10) ÷ 5 = 3 cm/day

**Relative (specific) growth rate** = (change in size ÷ original size) ÷ time
• This is more useful for comparing organisms of different sizes
• Example: A seedling grows from 2 cm to 6 cm in 4 days → relative growth rate = ((6 − 2) ÷ 2) ÷ 4 = 0.5 per day (or 50% per day)
• During exponential growth, the relative growth rate remains constant even though the absolute growth rate increases

**Factors affecting growth rate:**
• **Temperature** — affects enzyme activity; organisms have an optimal temperature range for growth
• **Nutrients** — availability of essential minerals, amino acids, glucose, etc.
• **Light** (for plants) — drives photosynthesis, which produces the organic molecules needed for growth
• **Genetic factors** — growth hormones, developmental genes
• **Water availability** — essential for cell expansion and metabolic reactions`,
    es: `**El crecimiento** en términos biológicos se refiere a un aumento irreversible en el tamaño o masa de un organismo. A nivel celular, el crecimiento ocurre a través de la división celular (aumento del número de células) y el agrandamiento celular (aumento del tamaño celular). El crecimiento se puede medir de varias formas:

**Métodos para medir el crecimiento:**
• **Masa seca** — la medida más precisa del crecimiento porque excluye el agua (que fluctúa). Los organismos se secan en un horno hasta alcanzar masa constante. Desventaja: el organismo debe ser sacrificado.
• **Masa húmeda (fresca)** — más fácil de medir pero menos confiable porque el contenido de agua varía con la hidratación, la hora del día y la alimentación reciente.
• **Longitud/altura** — simple de medir en muchos organismos pero no considera el crecimiento en otras dimensiones.
• **Número de células** — útil para organismos unicelulares y cultivos celulares, contados usando un hemocitómetro o estimados por dilución en serie y siembra en placa.

**Curvas de crecimiento:**

Cuando el crecimiento se grafica a lo largo del tiempo, los organismos típicamente muestran una **curva de crecimiento sigmoide (en forma de S)** con fases distintas:

**1. Fase de retardo (lag)** — crecimiento inicialmente lento mientras el organismo se ajusta a su ambiente, sintetiza enzimas y prepara la maquinaria celular para la división rápida. Se producen pocas células nuevas.

**2. Fase exponencial (log)** — crecimiento rápido y sin restricciones. La población u organismo se duplica a una tasa constante. Los recursos son abundantes y los productos de desecho no se han acumulado. Esta es la fase de tasa máxima de crecimiento.

**3. Fase estacionaria (meseta)** — la tasa de crecimiento se desacelera y eventualmente llega a cero. La tasa de producción de nuevas células iguala la tasa de muerte celular. Esto ocurre porque:
• Los nutrientes se vuelven limitantes
• Los productos de desecho se acumulan a niveles tóxicos
• El espacio se vuelve limitado
• En organismos multicelulares, las señales de crecimiento (hormonas) disminuyen cuando el organismo alcanza su tamaño adulto determinado genéticamente

**4. Fase de declive** (en poblaciones) — la tasa de muerte supera la tasa de reproducción; el tamaño de la población disminuye.

**Cálculo de la tasa de crecimiento:**

**Tasa de crecimiento absoluta** = cambio en tamaño ÷ cambio en tiempo
• Ejemplo: Una planta crece de 10 cm a 25 cm en 5 días → tasa de crecimiento absoluta = (25 − 10) ÷ 5 = 3 cm/día

**Tasa de crecimiento relativa (específica)** = (cambio en tamaño ÷ tamaño original) ÷ tiempo
• Es más útil para comparar organismos de diferentes tamaños
• Ejemplo: Una plántula crece de 2 cm a 6 cm en 4 días → tasa de crecimiento relativa = ((6 − 2) ÷ 2) ÷ 4 = 0.5 por día (o 50% por día)
• Durante el crecimiento exponencial, la tasa de crecimiento relativa permanece constante aunque la tasa de crecimiento absoluta aumente

**Factores que afectan la tasa de crecimiento:**
• **Temperatura** — afecta la actividad enzimática; los organismos tienen un rango de temperatura óptimo para el crecimiento
• **Nutrientes** — disponibilidad de minerales esenciales, aminoácidos, glucosa, etc.
• **Luz** (para plantas) — impulsa la fotosíntesis, que produce las moléculas orgánicas necesarias para el crecimiento
• **Factores genéticos** — hormonas de crecimiento, genes del desarrollo
• **Disponibilidad de agua** — esencial para la expansión celular y las reacciones metabólicas`
  },
  chunk5CC1Question: {
    en: "During which phase of a sigmoid growth curve is the growth rate highest?",
    es: "¿Durante cuál fase de una curva de crecimiento sigmoide es la tasa de crecimiento más alta?"
  },
  chunk5CC1Options: {
    en: ["Lag phase", "Exponential (log) phase", "Stationary phase", "Decline phase"],
    es: ["Fase de retardo", "Fase exponencial (log)", "Fase estacionaria", "Fase de declive"]
  },
  chunk5CC1Correct: { en: 1, es: 1 },
  chunk5CC1Explanation: {
    en: "The exponential (log) phase is when organisms divide at the fastest rate. Resources are plentiful, waste products haven't accumulated, and the population doubles at a constant rate. The lag phase has slow growth while organisms adapt. The stationary phase has zero net growth (production = death). The decline phase has negative growth.",
    es: "La fase exponencial (log) es cuando los organismos se dividen a la tasa más rápida. Los recursos son abundantes, los productos de desecho no se han acumulado y la población se duplica a una tasa constante. La fase de retardo tiene crecimiento lento mientras los organismos se adaptan. La fase estacionaria tiene crecimiento neto cero (producción = muerte). La fase de declive tiene crecimiento negativo."
  },

  // Chunk 6: Water Relations, Osmolarity & Solute Potential
  chunk6Title: {
    en: "Water Relations, Osmolarity & Solute Potential",
    es: "Relaciones Hídricas, Osmolaridad y Potencial de Soluto"
  },
  chunk6Content: {
    en: `**Water potential** (Ψ, psi) is a measure of the tendency of water to move from one area to another. Water always moves from a region of **higher water potential** to a region of **lower water potential**. Pure water has the highest possible water potential, defined as **Ψ = 0 kPa** (at standard conditions).

**The water potential equation:**
**Ψ = Ψs + Ψp**

Where:
• **Ψs (solute potential)** — also called osmotic potential. This is always **negative** (or zero for pure water). Adding solute to water lowers the water potential. The more solute dissolved, the more negative Ψs becomes.
• **Ψp (pressure potential)** — the physical pressure exerted on water. In plant cells, turgor pressure from the cell wall pushing back is a **positive** Ψp. In most animal cells and open solutions, Ψp = 0.

**Key principles:**
• Water moves by osmosis from high Ψ to low Ψ (down the water potential gradient)
• Adding solute makes Ψ more negative → water moves toward areas with more solute
• Pressure (turgor) makes Ψ more positive → water is pushed away from high-pressure areas

**Water potential in plant cells:**

• **Turgid cell** (in hypotonic solution): Water has entered the cell, the vacuole is full, and the cell membrane pushes firmly against the cell wall. Ψp is high (positive), Ψs is negative, but the overall Ψ is close to zero. The cell is firm and provides structural support to the plant.

• **Flaccid cell** (in isotonic solution): No net water movement. Ψp ≈ 0, and Ψ = Ψs (which is negative). The cell is limp — this causes wilting in non-woody plants.

• **Plasmolyzed cell** (in hypertonic solution): Water has left the cell, the vacuole has shrunk, and the cell membrane has pulled away from the cell wall. Ψp = 0 (membrane no longer pressing on wall), Ψ = Ψs (very negative). The point where the membrane just begins to pull away is called **incipient plasmolysis**.

**Estimating osmolarity of cells:**

The osmolarity of a cell can be estimated experimentally by finding the solution concentration at which **no net change in mass or volume** occurs (the isotonic point):

**Method 1 — Change in mass/length:**
1. Prepare a series of sucrose solutions of known concentrations (e.g., 0.0 M, 0.1 M, 0.2 M, ... 0.6 M)
2. Cut identical pieces of plant tissue (e.g., potato cylinders)
3. Measure initial mass or length
4. Place in solutions for a set time (e.g., 30 minutes)
5. Remove, blot dry, and measure final mass or length
6. Calculate percentage change in mass for each concentration
7. Plot percentage change vs. concentration
8. The concentration where the line crosses 0% change = the **isotonic concentration** ≈ osmolarity of the cells

**Method 2 — Incipient plasmolysis:**
1. Prepare serial dilutions of sucrose solution
2. Mount thin epidermis strips (e.g., red onion) in each solution
3. Observe under microscope
4. The concentration at which ~50% of cells show plasmolysis = the osmolarity of the cells

**Water relations in plants:**

Water moves through plants from soil → roots → stem → leaves → atmosphere, driven by differences in water potential:

• **Root uptake:** Soil water (high Ψ) moves into root hair cells (lower Ψ due to dissolved solutes) by osmosis. Water then moves from cell to cell toward the xylem, always from higher to lower Ψ.

• **Transpiration stream:** Water moves upward through **xylem vessels** by the **cohesion-tension theory**:
  – **Transpiration** — evaporation of water from leaf mesophyll cells through stomata creates a negative pressure (tension) at the top of the plant
  – **Cohesion** — water molecules are attracted to each other by hydrogen bonds, forming a continuous column in the xylem
  – **Adhesion** — water molecules also adhere to the walls of the xylem vessels, helping to counteract gravity
  – Together, transpiration pull draws the water column upward like a chain

• **Root pressure:** Active transport of mineral ions into the xylem of root cells lowers Ψ in the xylem, causing water to follow by osmosis. This generates a small upward push, supplementing the transpiration pull.`,
    es: `**El potencial hídrico** (Ψ, psi) es una medida de la tendencia del agua a moverse de un área a otra. El agua siempre se mueve de una región de **mayor potencial hídrico** a una región de **menor potencial hídrico**. El agua pura tiene el potencial hídrico más alto posible, definido como **Ψ = 0 kPa** (en condiciones estándar).

**La ecuación del potencial hídrico:**
**Ψ = Ψs + Ψp**

Donde:
• **Ψs (potencial de soluto)** — también llamado potencial osmótico. Siempre es **negativo** (o cero para agua pura). Agregar soluto al agua disminuye el potencial hídrico. Cuanto más soluto disuelto, más negativo se vuelve Ψs.
• **Ψp (potencial de presión)** — la presión física ejercida sobre el agua. En células vegetales, la presión de turgencia de la pared celular empujando hacia atrás es un Ψp **positivo**. En la mayoría de las células animales y soluciones abiertas, Ψp = 0.

**Principios clave:**
• El agua se mueve por ósmosis de alto Ψ a bajo Ψ (a favor del gradiente de potencial hídrico)
• Agregar soluto hace Ψ más negativo → el agua se mueve hacia áreas con más soluto
• La presión (turgencia) hace Ψ más positivo → el agua es empujada lejos de áreas de alta presión

**Potencial hídrico en células vegetales:**

• **Célula túrgida** (en solución hipotónica): El agua ha entrado a la célula, la vacuola está llena y la membrana celular empuja firmemente contra la pared celular. Ψp es alto (positivo), Ψs es negativo, pero el Ψ general está cerca de cero. La célula está firme y proporciona soporte estructural a la planta.

• **Célula flácida** (en solución isotónica): Sin movimiento neto de agua. Ψp ≈ 0, y Ψ = Ψs (que es negativo). La célula está blanda — esto causa marchitamiento en plantas no leñosas.

• **Célula plasmolizada** (en solución hipertónica): El agua ha salido de la célula, la vacuola se ha encogido y la membrana celular se ha separado de la pared celular. Ψp = 0 (la membrana ya no presiona la pared), Ψ = Ψs (muy negativo). El punto donde la membrana apenas comienza a separarse se llama **plasmólisis incipiente**.

**Estimación de la osmolaridad de las células:**

La osmolaridad de una célula se puede estimar experimentalmente encontrando la concentración de solución en la cual **no hay cambio neto en masa o volumen** (el punto isotónico):

**Método 1 — Cambio en masa/longitud:**
1. Preparar una serie de soluciones de sacarosa de concentraciones conocidas (ej., 0.0 M, 0.1 M, 0.2 M, ... 0.6 M)
2. Cortar piezas idénticas de tejido vegetal (ej., cilindros de papa)
3. Medir la masa o longitud inicial
4. Colocar en las soluciones por un tiempo determinado (ej., 30 minutos)
5. Retirar, secar con papel y medir la masa o longitud final
6. Calcular el cambio porcentual en masa para cada concentración
7. Graficar el cambio porcentual vs. concentración
8. La concentración donde la línea cruza 0% de cambio = la **concentración isotónica** ≈ osmolaridad de las células

**Método 2 — Plasmólisis incipiente:**
1. Preparar diluciones en serie de solución de sacarosa
2. Montar tiras delgadas de epidermis (ej., cebolla morada) en cada solución
3. Observar bajo microscopio
4. La concentración en la cual ~50% de las células muestran plasmólisis = la osmolaridad de las células

**Relaciones hídricas en plantas:**

El agua se mueve a través de las plantas desde suelo → raíces → tallo → hojas → atmósfera, impulsada por diferencias en potencial hídrico:

• **Absorción por raíces:** El agua del suelo (alto Ψ) se mueve hacia las células de los pelos radiculares (menor Ψ debido a solutos disueltos) por ósmosis. El agua luego se mueve de célula a célula hacia el xilema, siempre de mayor a menor Ψ.

• **Corriente de transpiración:** El agua se mueve hacia arriba a través de los **vasos del xilema** por la **teoría de cohesión-tensión**:
  – **Transpiración** — la evaporación de agua de las células del mesófilo foliar a través de los estomas crea una presión negativa (tensión) en la parte superior de la planta
  – **Cohesión** — las moléculas de agua se atraen entre sí por puentes de hidrógeno, formando una columna continua en el xilema
  – **Adhesión** — las moléculas de agua también se adhieren a las paredes de los vasos del xilema, ayudando a contrarrestar la gravedad
  – Juntas, la fuerza de transpiración arrastra la columna de agua hacia arriba como una cadena

• **Presión radicular:** El transporte activo de iones minerales hacia el xilema de las células de la raíz disminuye Ψ en el xilema, causando que el agua siga por ósmosis. Esto genera un pequeño empuje hacia arriba, complementando la fuerza de transpiración.`
  },
  chunk6CC1Question: {
    en: "A plant cell has a solute potential (Ψs) of −800 kPa and a pressure potential (Ψp) of +300 kPa. Calculate the water potential of the cell and predict the direction of water movement if the cell is placed in pure water.",
    es: "Una célula vegetal tiene un potencial de soluto (Ψs) de −800 kPa y un potencial de presión (Ψp) de +300 kPa. Calcula el potencial hídrico de la célula y predice la dirección del movimiento del agua si la célula se coloca en agua pura."
  },
  chunk6CC1Answer: {
    en: "Water potential Ψ = Ψs + Ψp = (−800) + (+300) = −500 kPa. Pure water has Ψ = 0 kPa. Since water moves from higher water potential to lower water potential, water will move from the pure water (Ψ = 0) into the cell (Ψ = −500) by osmosis. The cell will absorb water, the vacuole will expand, and the cell will become turgid as Ψp increases.",
    es: "El potencial hídrico Ψ = Ψs + Ψp = (−800) + (+300) = −500 kPa. El agua pura tiene Ψ = 0 kPa. Como el agua se mueve de mayor potencial hídrico a menor potencial hídrico, el agua se moverá del agua pura (Ψ = 0) hacia la célula (Ψ = −500) por ósmosis. La célula absorberá agua, la vacuola se expandirá y la célula se volverá túrgida a medida que Ψp aumente."
  },

  // Textbook references
  textbookRef: {
    en: "Open Your Textbook",
    es: "Abre tu Libro de Texto"
  },
  textbookRefSubtitle: {
    en: "Use the diagrams in your textbook, workbook, or study guide alongside this app to get the most out of your review.",
    es: "Usa los diagramas de tu libro de texto, cuaderno de trabajo o guía de estudio junto con esta aplicación para aprovechar al máximo tu repaso."
  },
  textbookRef1: {
    en: "📖 Biozone pp. 443–452: Study the cell cycle diagram and the stages of mitosis. For each stage, know what is happening to the chromosomes, the nuclear membrane, and the spindle fibers. Practice identifying mitotic stages from micrographs — the IB exam often shows photos of cells in different stages and asks you to identify them.",
    es: "📖 Biozone pp. 443–452: Estudia el diagrama del ciclo celular y las etapas de la mitosis. Para cada etapa, conoce qué está sucediendo con los cromosomas, la membrana nuclear y las fibras del huso. Practica identificando etapas mitóticas en micrografías — el examen IB frecuentemente muestra fotos de células en diferentes etapas y te pide que las identifiques."
  },
  textbookRef2: {
    en: "📖 Biozone pp. 448–450: Review the stages of meiosis I and meiosis II carefully. Focus on the differences between meiosis I and meiosis II, and between meiosis and mitosis. Make sure you can explain crossing over, independent assortment, and random fertilization as sources of genetic variation. Non-disjunction and its consequences (trisomy, monosomy) is an important HL topic.",
    es: "📖 Biozone pp. 448–450: Revisa cuidadosamente las etapas de la meiosis I y meiosis II. Concéntrate en las diferencias entre meiosis I y meiosis II, y entre meiosis y mitosis. Asegúrate de poder explicar el entrecruzamiento, la distribución independiente y la fecundación aleatoria como fuentes de variación genética. La no disyunción y sus consecuencias (trisomía, monosomía) es un tema importante de NS."
  },
  textbookRef3: {
    en: "📖 Biozone pp. 453–454: Study the cell cycle regulation diagrams, especially the checkpoints and the roles of cyclins and CDKs. For cancer, focus on the roles of oncogenes vs. tumor suppressors, and the multi-hit hypothesis. p53 is the most commonly examined protein — know its function in detail.\n\n📖 HL students: review the connection between mutagens, DNA damage, and the development of cancer — this integrates well with the cell cycle regulation content.",
    es: "📖 Biozone pp. 453–454: Estudia los diagramas de regulación del ciclo celular, especialmente los puntos de control y los roles de las ciclinas y CDKs. Para cáncer, concéntrate en los roles de oncogenes vs. supresores tumorales, y la hipótesis de múltiples impactos. p53 es la proteína más comúnmente examinada — conoce su función en detalle.\n\n📖 Estudiantes NS: revisen la conexión entre mutágenos, daño al ADN y el desarrollo del cáncer — esto se integra bien con el contenido de regulación del ciclo celular."
  },
  textbookRef4: {
    en: "📖 Biozone pp. 456–460: Review the mechanisms of gene regulation carefully — transcription factors, epigenetic modifications (DNA methylation and histone acetylation/deacetylation), and examples like X-inactivation and genomic imprinting. Understand how environmental factors can influence epigenetic marks.",
    es: "📖 Biozone pp. 456–460: Revisa cuidadosamente los mecanismos de regulación génica — factores de transcripción, modificaciones epigenéticas (metilación del ADN y acetilación/desacetilación de histonas), y ejemplos como la inactivación del X e impronta genómica. Comprende cómo los factores ambientales pueden influir en las marcas epigenéticas."
  },
  textbookRef5: {
    en: "📖 Biozone p. 455: Review growth curves and how to calculate absolute and relative growth rates. Practice interpreting sigmoid curves — identify each phase and explain what is happening at the cellular level. Be prepared to compare growth curves of different organisms or under different conditions.",
    es: "📖 Biozone p. 455: Revisa las curvas de crecimiento y cómo calcular las tasas de crecimiento absoluta y relativa. Practica interpretando curvas sigmoides — identifica cada fase y explica qué está sucediendo a nivel celular. Prepárate para comparar curvas de crecimiento de diferentes organismos o bajo diferentes condiciones."
  },
  textbookRef6: {
    en: "📖 Biozone pp. 464–468: Study the water potential equation (Ψ = Ψs + Ψp) carefully — know what each component represents and how they change in different conditions. Practice the osmolarity estimation experiment (potato cylinder method). For water relations in plants, focus on the cohesion-tension theory and be able to explain the transpiration stream from roots to leaves.",
    es: "📖 Biozone pp. 464–468: Estudia cuidadosamente la ecuación del potencial hídrico (Ψ = Ψs + Ψp) — conoce qué representa cada componente y cómo cambian en diferentes condiciones. Practica el experimento de estimación de osmolaridad (método del cilindro de papa). Para relaciones hídricas en plantas, concéntrate en la teoría de cohesión-tensión y sé capaz de explicar la corriente de transpiración desde las raíces hasta las hojas."
  },

  // Interactive labels
  interactiveMitosis: {
    en: "Mitosis Cell Cycle Visualizer",
    es: "Visualizador del Ciclo Celular — Mitosis"
  },
  interactiveMeiosis: {
    en: "Meiosis vs Mitosis Comparison",
    es: "Comparación Meiosis vs Mitosis"
  },

  // Challenge questions
  challengeQ1: {
    en: "Outline the stages of mitosis and explain the importance of the mitotic index. [4 marks]",
    es: "Resume las etapas de la mitosis y explica la importancia del índice mitótico. [4 puntos]"
  },
  challengeA1: {
    en: "Mitosis consists of four stages: In prophase, chromosomes condense and become visible, the nuclear membrane breaks down, and spindle fibers form. In metaphase, chromosomes align at the metaphase plate with spindle fibers attached to their centromeres. In anaphase, centromeres split and sister chromatids are pulled to opposite poles by shortening spindle fibers. In telophase, chromosomes decondense, nuclear membranes reform, and the cell has two nuclei. Cytokinesis then divides the cytoplasm. The mitotic index (cells in mitosis ÷ total cells) indicates the rate of cell division in a tissue. A high mitotic index can indicate cancerous tissue, since cancer cells divide uncontrollably. It can also identify regions of active growth, such as root tips in plants.",
    es: "La mitosis consiste en cuatro etapas: En la profase, los cromosomas se condensan y se hacen visibles, la membrana nuclear se desintegra y se forman las fibras del huso. En la metafase, los cromosomas se alinean en la placa metafásica con las fibras del huso unidas a sus centrómeros. En la anafase, los centrómeros se dividen y las cromátidas hermanas son haladas a polos opuestos por el acortamiento de las fibras del huso. En la telofase, los cromosomas se descondensan, las membranas nucleares se reforman, y la célula tiene dos núcleos. La citocinesis luego divide el citoplasma. El índice mitótico (células en mitosis ÷ total de células) indica la tasa de división celular en un tejido. Un alto índice mitótico puede indicar tejido canceroso, ya que las células cancerosas se dividen incontrolablemente. También puede identificar regiones de crecimiento activo, como las puntas de raíces en plantas."
  },
  challengeQ2: {
    en: "Explain how crossing over and independent assortment during meiosis contribute to genetic variation. [4 marks]",
    es: "Explica cómo el entrecruzamiento y la distribución independiente durante la meiosis contribuyen a la variación genética. [4 puntos]"
  },
  challengeA2: {
    en: "During prophase I, homologous chromosomes pair up and crossing over occurs at chiasmata — non-sister chromatids exchange DNA segments, creating recombinant chromosomes with new allele combinations that did not exist on either parental chromosome. This means that the alleles on a chromosome can be reshuffled into novel combinations. During metaphase I, independent assortment occurs — the orientation of each homologous pair at the metaphase plate is random, meaning either the maternal or paternal chromosome can face either pole. With 23 pairs in humans, this produces 2²³ (over 8 million) possible combinations of chromosomes in the gametes. Together, crossing over recombines alleles within chromosomes while independent assortment randomizes which chromosomes end up in each gamete, ensuring that every gamete is genetically unique.",
    es: "Durante la profase I, los cromosomas homólogos se emparejan y ocurre el entrecruzamiento en los quiasmas — las cromátidas no hermanas intercambian segmentos de ADN, creando cromosomas recombinantes con nuevas combinaciones de alelos que no existían en ninguno de los cromosomas parentales. Esto significa que los alelos en un cromosoma pueden reorganizarse en combinaciones novedosas. Durante la metafase I, ocurre la distribución independiente — la orientación de cada par homólogo en la placa metafásica es aleatoria, significando que el cromosoma materno o paterno puede enfrentar cualquier polo. Con 23 pares en humanos, esto produce 2²³ (más de 8 millones) posibles combinaciones de cromosomas en los gametos. Juntos, el entrecruzamiento recombina alelos dentro de los cromosomas mientras la distribución independiente aleatoriza qué cromosomas terminan en cada gameto, asegurando que cada gameto sea genéticamente único."
  },
  challengeQ3: {
    en: "Explain the role of tumor suppressor genes and oncogenes in the development of cancer. [4 marks]",
    es: "Explica el papel de los genes supresores de tumores y los oncogenes en el desarrollo del cáncer. [4 puntos]"
  },
  challengeA3: {
    en: "Tumor suppressor genes encode proteins that inhibit cell division and promote apoptosis — they act as 'brakes' on the cell cycle. For example, p53 detects DNA damage, halts the cell cycle at the G₁ checkpoint for repair, and triggers apoptosis if repair fails. When tumor suppressor genes are mutated (loss-of-function), these protective mechanisms are lost and damaged cells can continue to divide. Proto-oncogenes are normal genes that promote cell growth and division. When mutated (gain-of-function), they become oncogenes — permanently active signals that drive uncontrolled cell division, like an accelerator stuck on. Cancer typically requires multiple mutations affecting both tumor suppressors and proto-oncogenes (the multi-hit hypothesis). The combination of lost braking (tumor suppressors) and stuck accelerators (oncogenes) leads to uncontrolled cell division and tumor formation.",
    es: "Los genes supresores de tumores codifican proteínas que inhiben la división celular y promueven la apoptosis — actúan como 'frenos' del ciclo celular. Por ejemplo, p53 detecta daño en el ADN, detiene el ciclo celular en el punto de control G₁ para reparación, y desencadena la apoptosis si la reparación falla. Cuando los genes supresores de tumores mutan (pérdida de función), estos mecanismos protectores se pierden y las células dañadas pueden continuar dividiéndose. Los proto-oncogenes son genes normales que promueven el crecimiento y la división celular. Cuando mutan (ganancia de función), se convierten en oncogenes — señales permanentemente activas que impulsan la división celular descontrolada, como un acelerador atascado. El cáncer típicamente requiere múltiples mutaciones que afectan tanto a supresores tumorales como a proto-oncogenes (la hipótesis de múltiples impactos). La combinación de frenos perdidos (supresores tumorales) y aceleradores atascados (oncogenes) lleva a la división celular descontrolada y la formación de tumores."
  },
  challengeQ4: {
    en: "Explain how two different epigenetic mechanisms can alter gene expression without changing the DNA base sequence. [4 marks]",
    es: "Explica cómo dos mecanismos epigenéticos diferentes pueden alterar la expresión génica sin cambiar la secuencia de bases del ADN. [4 puntos]"
  },
  challengeA4: {
    en: "DNA methylation involves adding methyl groups to cytosine bases at CpG sites in the promoter region. This prevents transcription factors from binding to the promoter, silencing the gene without altering the base sequence. Methylation patterns are copied during replication and passed to daughter cells. Histone acetylation involves adding acetyl groups to histone tails, which reduces their positive charge and loosens the DNA-histone interaction. This opens the chromatin structure (euchromatin), making genes accessible for transcription. Conversely, histone deacetylation compacts chromatin into heterochromatin, silencing genes. Both mechanisms are reversible and can be influenced by environmental factors such as diet and stress. Epigenetic modifications can be inherited during cell division and some evidence suggests they can be transmitted across generations.",
    es: "La metilación del ADN implica añadir grupos metilo a las bases de citosina en sitios CpG en la región promotora. Esto impide que los factores de transcripción se unan al promotor, silenciando el gen sin alterar la secuencia de bases. Los patrones de metilación se copian durante la replicación y se transmiten a las células hijas. La acetilación de histonas implica añadir grupos acetilo a las colas de histonas, lo que reduce su carga positiva y afloja la interacción ADN-histona. Esto abre la estructura de la cromatina (eucromatina), haciendo los genes accesibles para la transcripción. Por el contrario, la desacetilación de histonas compacta la cromatina en heterocromatina, silenciando los genes. Ambos mecanismos son reversibles y pueden ser influenciados por factores ambientales como la dieta y el estrés. Las modificaciones epigenéticas pueden heredarse durante la división celular y alguna evidencia sugiere que pueden transmitirse a través de generaciones."
  },
  challengeQ5: {
    en: "A population of bacteria is grown in a nutrient broth. Sketch and label a typical sigmoid growth curve and explain what is happening during each phase. [3 marks]",
    es: "Una población de bacterias se cultiva en un caldo de nutrientes. Dibuja y rotula una curva de crecimiento sigmoide típica y explica qué está sucediendo durante cada fase. [3 puntos]"
  },
  challengeA5: {
    en: "The curve should show four phases: (1) Lag phase — the bacteria adapt to the new environment, synthesizing enzymes and preparing for division; cell numbers increase slowly. (2) Exponential (log) phase — bacteria divide rapidly at a constant rate by binary fission; resources are plentiful, waste products low, and the population doubles in regular intervals. (3) Stationary phase — the growth rate equals the death rate, so the population size remains constant; this occurs because nutrients are depleted, waste products accumulate to inhibitory levels, and space becomes limiting. (4) Decline phase — the death rate exceeds the reproduction rate; the population decreases as conditions become increasingly unfavorable.",
    es: "La curva debe mostrar cuatro fases: (1) Fase de retardo — las bacterias se adaptan al nuevo ambiente, sintetizando enzimas y preparándose para la división; el número de células aumenta lentamente. (2) Fase exponencial (log) — las bacterias se dividen rápidamente a una tasa constante por fisión binaria; los recursos son abundantes, los productos de desecho son bajos y la población se duplica en intervalos regulares. (3) Fase estacionaria — la tasa de crecimiento iguala la tasa de muerte, por lo que el tamaño de la población permanece constante; esto ocurre porque los nutrientes se agotan, los productos de desecho se acumulan a niveles inhibitorios y el espacio se vuelve limitante. (4) Fase de declive — la tasa de muerte supera la tasa de reproducción; la población disminuye a medida que las condiciones se vuelven cada vez más desfavorables."
  },
  challengeQ6: {
    en: "Explain the concept of water potential and predict what will happen to a plant cell placed in a solution with a water potential of −1200 kPa, given that the cell has Ψs = −800 kPa and Ψp = +300 kPa. [4 marks]",
    es: "Explica el concepto de potencial hídrico y predice qué sucederá con una célula vegetal colocada en una solución con un potencial hídrico de −1200 kPa, dado que la célula tiene Ψs = −800 kPa y Ψp = +300 kPa. [4 puntos]"
  },
  challengeA6: {
    en: "Water potential (Ψ) measures the tendency of water to move from one region to another; water always moves from higher Ψ to lower Ψ by osmosis. The cell's water potential is Ψ = Ψs + Ψp = (−800) + (+300) = −500 kPa. The external solution has Ψ = −1200 kPa. Since the cell's Ψ (−500) is higher than the solution's Ψ (−1200), water will leave the cell by osmosis, moving down the water potential gradient. As water leaves, the vacuole will shrink, turgor pressure will decrease (Ψp decreases toward 0), and the cell membrane will pull away from the cell wall. This is plasmolysis. If left long enough, the cell will reach equilibrium when its Ψ equals −1200 kPa.",
    es: "El potencial hídrico (Ψ) mide la tendencia del agua a moverse de una región a otra; el agua siempre se mueve de mayor Ψ a menor Ψ por ósmosis. El potencial hídrico de la célula es Ψ = Ψs + Ψp = (−800) + (+300) = −500 kPa. La solución externa tiene Ψ = −1200 kPa. Como el Ψ de la célula (−500) es mayor que el Ψ de la solución (−1200), el agua saldrá de la célula por ósmosis, moviéndose a favor del gradiente de potencial hídrico. A medida que el agua sale, la vacuola se encogerá, la presión de turgencia disminuirá (Ψp disminuye hacia 0) y la membrana celular se separará de la pared celular. Esto es plasmólisis. Si se deja suficiente tiempo, la célula alcanzará el equilibrio cuando su Ψ iguale −1200 kPa."
  },

  // HL flags for challenge questions
  challengeQ2HLOnly: { en: true, es: true },
  challengeQ3HLOnly: { en: true, es: true },
};

// Helper to get translated text
const t = (key, lang) => {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
};

// ═══════════════════════════════════════════════════════════════════
// LANDING PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════
function LandingPage({ onStart, lang, setLang }) {
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-coyote-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-brand-200 bg-brand-50">
            <img
              src="/logo.png"
              alt="Laughing Coyote Education"
              className="w-full h-full object-cover object-center"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-1">{t('welcome', lang)}</p>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">{t('appTitle', lang)}</h1>
        <p className="text-sm text-brand-600 mb-8">{t('appSubtitle', lang)}</p>

        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              lang === 'en' ? 'bg-brand-600 text-white shadow' : 'bg-white border border-gray-300 text-gray-600'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('es')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              lang === 'es' ? 'bg-brand-600 text-white shadow' : 'bg-white border border-gray-300 text-gray-600'
            }`}
          >
            ES
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-3">{t('enterName', lang)}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('namePlaceholder', lang)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-brand-400 mb-4"
          onKeyDown={(e) => { if (e.key === 'Enter' && name.trim()) onStart(name.trim()); }}
        />
        <button
          onClick={() => name.trim() && onStart(name.trim())}
          disabled={!name.trim()}
          className="w-full py-3 bg-brand-600 text-white rounded-lg font-semibold text-lg hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('startButton', lang)}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CONCEPT CHECK — MCQ
// ═══════════════════════════════════════════════════════════════════
function ConceptCheckMCQ({ question, options, correctIndex, explanation, lang }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected !== null) setSubmitted(true);
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
  };

  const isCorrect = selected === correctIndex;

  return (
    <div className="concept-check-box">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-4 h-4 text-amber-600" />
        <span className="font-semibold text-amber-800 text-sm">{t('conceptCheck', lang)}</span>
      </div>
      <p className="text-sm text-gray-800 mb-3 font-medium">{question}</p>
      <div className="space-y-2 mb-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => !submitted && setSelected(i)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${
              submitted && i === correctIndex
                ? 'bg-green-100 border-green-400 text-green-800'
                : submitted && i === selected && !isCorrect
                ? 'bg-red-100 border-red-400 text-red-800'
                : selected === i
                ? 'bg-brand-100 border-brand-400 text-brand-800'
                : 'bg-white border-gray-200 hover:border-brand-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {t('checkAnswer', lang)}
        </button>
      ) : (
        <div>
          <div className={`flex items-center gap-2 mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            <span className="font-semibold text-sm">{isCorrect ? t('correct', lang) : t('incorrect', lang)}</span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{explanation}</p>
          {!isCorrect && (
            <button onClick={handleReset} className="text-sm text-amber-700 underline">
              {t('tryAgain', lang)}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CONCEPT CHECK — SHORT ANSWER
// ═══════════════════════════════════════════════════════════════════
function ConceptCheckShortAnswer({ question, answer, lang }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="concept-check-box">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-4 h-4 text-amber-600" />
        <span className="font-semibold text-amber-800 text-sm">{t('conceptCheck', lang)}</span>
      </div>
      <p className="text-sm text-gray-800 mb-3 font-medium">{question}</p>
      <textarea
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder={t('yourAnswer', lang)}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium"
        >
          {t('revealModel', lang)}
        </button>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-green-700 mb-1">{t('modelAnswer', lang)}:</p>
          <p className="text-sm text-green-900">{answer}</p>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TEXTBOOK REFERENCE
// ═══════════════════════════════════════════════════════════════════
function TextbookReference({ referenceKey, lang }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-4 border border-blue-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 transition-colors text-left"
      >
        {open ? <ChevronDown className="w-4 h-4 text-blue-600" /> : <ChevronRight className="w-4 h-4 text-blue-600" />}
        <BookOpen className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-semibold text-blue-800">{t('textbookRef', lang)}</span>
      </button>
      {open && (
        <div className="px-4 py-3 bg-white">
          <p className="text-xs text-gray-500 mb-2">{t('textbookRefSubtitle', lang)}</p>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">{t(referenceKey, lang)}</div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DIVE DEEPER — cross-reference callout to companion apps
// ═══════════════════════════════════════════════════════════════════
function DiveDeeper({ lang, apps }) {
  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-brand-50 to-green-50 border border-brand-200 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap className="w-5 h-5 text-brand-700" />
        <h3 className="text-sm font-bold text-brand-800 uppercase tracking-wide">
          {lang === 'en' ? '🔗 Dive Deeper' : '🔗 Profundiza Más'}
        </h3>
      </div>
      <p className="text-xs text-gray-600 mb-3">
        {lang === 'en'
          ? 'Explore these companion apps for more in-depth practice and simulations:'
          : 'Explora estas aplicaciones complementarias para practicar y simular más a fondo:'}
      </p>
      <div className="flex flex-col gap-2">
        {apps.map(({ name, url, desc }) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-brand-400 hover:shadow-md transition-all group"
          >
            <div className="flex-1">
              <span className="text-sm font-semibold text-brand-700 group-hover:text-brand-800">{name}</span>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-brand-600 flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// INTERACTIVE: MITOSIS CELL CYCLE VISUALIZER
// ═══════════════════════════════════════════════════════════════════
function MitosisCycleVisualizer({ lang }) {
  const [activeStage, setActiveStage] = useState('interphase');

  const stages = [
    {
      id: 'interphase',
      label: { en: 'Interphase', es: 'Interfase' },
      color: '#5f7148',
      desc: {
        en: 'G₁: Cell grows, produces proteins. S: DNA replication → sister chromatids joined at centromere. G₂: Final growth, produces tubulin for spindle.',
        es: 'G₁: La célula crece, produce proteínas. S: Replicación del ADN → cromátidas hermanas unidas en el centrómero. G₂: Crecimiento final, produce tubulina para el huso.'
      },
      keyEvent: { en: 'DNA replication (S phase)', es: 'Replicación del ADN (fase S)' },
      chromosomes: { en: 'Chromosomes are uncondensed chromatin', es: 'Los cromosomas son cromatina descondensada' },
    },
    {
      id: 'prophase',
      label: { en: 'Prophase', es: 'Profase' },
      color: '#dc2626',
      desc: {
        en: 'Chromosomes condense and become visible. Each is two sister chromatids joined at the centromere. Nuclear membrane begins to break down. Spindle fibers start forming.',
        es: 'Los cromosomas se condensan y se hacen visibles. Cada uno son dos cromátidas hermanas unidas en el centrómero. La membrana nuclear comienza a desintegrarse. Las fibras del huso comienzan a formarse.'
      },
      keyEvent: { en: 'Chromosome condensation', es: 'Condensación de cromosomas' },
      chromosomes: { en: 'Condensed X-shaped (sister chromatids)', es: 'Condensados en forma de X (cromátidas hermanas)' },
    },
    {
      id: 'metaphase',
      label: { en: 'Metaphase', es: 'Metafase' },
      color: '#2563eb',
      desc: {
        en: 'Chromosomes line up at the metaphase plate (cell equator). Spindle fibers attach to centromeres. This alignment ensures each daughter cell gets one copy of each chromosome.',
        es: 'Los cromosomas se alinean en la placa metafásica (ecuador celular). Las fibras del huso se unen a los centrómeros. Esta alineación asegura que cada célula hija reciba una copia de cada cromosoma.'
      },
      keyEvent: { en: 'Alignment at metaphase plate', es: 'Alineación en la placa metafásica' },
      chromosomes: { en: 'Lined up at the equator', es: 'Alineados en el ecuador' },
    },
    {
      id: 'anaphase',
      label: { en: 'Anaphase', es: 'Anafase' },
      color: '#d97706',
      desc: {
        en: 'Centromeres split. Sister chromatids are pulled to opposite poles by shortening spindle fibers. Each chromatid is now an individual chromosome. The cell begins to elongate.',
        es: 'Los centrómeros se dividen. Las cromátidas hermanas son haladas a polos opuestos por las fibras del huso que se acortan. Cada cromátida ahora es un cromosoma individual. La célula comienza a elongarse.'
      },
      keyEvent: { en: 'Sister chromatids separate', es: 'Las cromátidas hermanas se separan' },
      chromosomes: { en: 'Moving to opposite poles', es: 'Moviéndose a polos opuestos' },
    },
    {
      id: 'telophase',
      label: { en: 'Telophase', es: 'Telofase' },
      color: '#7c3aed',
      desc: {
        en: 'Chromosomes arrive at poles and decondense. Nuclear membranes reform around each set. Spindle fibers disassemble. Cytokinesis divides the cytoplasm → two identical daughter cells.',
        es: 'Los cromosomas llegan a los polos y se descondensan. Las membranas nucleares se reforman alrededor de cada conjunto. Las fibras del huso se desensamblan. La citocinesis divide el citoplasma → dos células hijas idénticas.'
      },
      keyEvent: { en: 'Nuclear membranes reform', es: 'Las membranas nucleares se reforman' },
      chromosomes: { en: 'Decondensing at the poles', es: 'Descondensándose en los polos' },
    },
  ];

  const currentStage = stages.find(s => s.id === activeStage);
  const currentIndex = stages.findIndex(s => s.id === activeStage);

  // Pie data representing time spent in each phase
  const pieData = [
    { name: lang === 'en' ? 'G₁' : 'G₁', value: 40, color: '#95a67a' },
    { name: 'S', value: 30, color: '#5f7148' },
    { name: lang === 'en' ? 'G₂' : 'G₂', value: 15, color: '#b4be9e' },
    { name: lang === 'en' ? 'Mitosis' : 'Mitosis', value: 15, color: '#dc2626' },
  ];

  // SVG cell diagram for each stage
  const renderStageCell = () => {
    const w = 180, h = 140, cx = w / 2, cy = h / 2;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[180px] mx-auto">
        {activeStage === 'interphase' && (
          <>
            <circle cx={cx} cy={cy} r={50} fill="#fef3c7" stroke="#92400e" strokeWidth={2} />
            <circle cx={cx} cy={cy} r={20} fill="#e9d5ff" stroke="#7c3aed" strokeWidth={1.5} />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize={8} fill="#7c3aed">DNA</text>
          </>
        )}
        {activeStage === 'prophase' && (
          <>
            <circle cx={cx} cy={cy} r={50} fill="#fef3c7" stroke="#92400e" strokeWidth={2} strokeDasharray="6,3" />
            <text x={cx - 15} y={cy - 5} fontSize={16} fill="#dc2626">✖</text>
            <text x={cx + 5} y={cy + 12} fontSize={16} fill="#dc2626">✖</text>
            <text x={cx - 8} y={cy + 20} fontSize={14} fill="#dc2626">✖</text>
          </>
        )}
        {activeStage === 'metaphase' && (
          <>
            <ellipse cx={cx} cy={cy} rx={50} ry={50} fill="#fef3c7" stroke="#92400e" strokeWidth={2} />
            <line x1={cx} y1={cy - 45} x2={cx} y2={cy + 45} stroke="#2563eb" strokeWidth={1} strokeDasharray="4,2" />
            <text x={cx - 8} y={cy - 15} fontSize={14} fill="#dc2626">✖</text>
            <text x={cx - 8} y={cy + 2} fontSize={14} fill="#dc2626">✖</text>
            <text x={cx - 8} y={cy + 19} fontSize={14} fill="#dc2626">✖</text>
            <line x1={cx - 45} y1={20} x2={cx - 2} y2={cy - 20} stroke="#999" strokeWidth={0.5} />
            <line x1={cx + 45} y1={20} x2={cx + 2} y2={cy - 20} stroke="#999" strokeWidth={0.5} />
            <line x1={cx - 45} y1={h - 20} x2={cx - 2} y2={cy + 20} stroke="#999" strokeWidth={0.5} />
            <line x1={cx + 45} y1={h - 20} x2={cx + 2} y2={cy + 20} stroke="#999" strokeWidth={0.5} />
          </>
        )}
        {activeStage === 'anaphase' && (
          <>
            <ellipse cx={cx} cy={cy} rx={55} ry={45} fill="#fef3c7" stroke="#92400e" strokeWidth={2} />
            <text x={cx - 35} y={cy - 5} fontSize={11} fill="#dc2626">| |</text>
            <text x={cx - 35} y={cy + 10} fontSize={11} fill="#dc2626">| |</text>
            <text x={cx + 20} y={cy - 5} fontSize={11} fill="#dc2626">| |</text>
            <text x={cx + 20} y={cy + 10} fontSize={11} fill="#dc2626">| |</text>
            <path d={`M${cx - 10},${cy} L${cx - 30},${cy}`} stroke="#d97706" strokeWidth={1.5} markerEnd="url(#arrowM)" />
            <path d={`M${cx + 10},${cy} L${cx + 30},${cy}`} stroke="#d97706" strokeWidth={1.5} markerEnd="url(#arrowM)" />
            <defs>
              <marker id="arrowM" markerWidth={6} markerHeight={5} refX={6} refY={2.5} orient="auto">
                <path d="M0,0 L6,2.5 L0,5" fill="#d97706" />
              </marker>
            </defs>
          </>
        )}
        {activeStage === 'telophase' && (
          <>
            <ellipse cx={cx - 28} cy={cy} rx={28} ry={40} fill="#fef3c7" stroke="#92400e" strokeWidth={2} />
            <ellipse cx={cx + 28} cy={cy} rx={28} ry={40} fill="#fef3c7" stroke="#92400e" strokeWidth={2} />
            <circle cx={cx - 28} cy={cy} r={12} fill="#e9d5ff" stroke="#7c3aed" strokeWidth={1} />
            <circle cx={cx + 28} cy={cy} r={12} fill="#e9d5ff" stroke="#7c3aed" strokeWidth={1} />
            <line x1={cx} y1={cy - 42} x2={cx} y2={cy + 42} stroke="#92400e" strokeWidth={1} strokeDasharray="3,2" />
          </>
        )}
      </svg>
    );
  };

  return (
    <div className="interactive-box">
      <div className="flex items-center gap-2 mb-3">
        <CircleDot className="w-5 h-5 text-brand-600" />
        <h3 className="font-bold text-gray-800">{t('interactiveMitosis', lang)}</h3>
      </div>
      <p className="text-xs text-gray-600 mb-4">
        {lang === 'en'
          ? "Click through each stage of the cell cycle and mitosis to review what happens at each step."
          : "Haz clic en cada etapa del ciclo celular y la mitosis para repasar qué sucede en cada paso."}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {stages.map((stage, i) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(stage.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              activeStage === stage.id
                ? 'text-white shadow'
                : 'bg-white border border-gray-300 text-gray-600 hover:border-brand-400'
            }`}
            style={activeStage === stage.id ? { backgroundColor: stage.color } : {}}
          >
            <span className="w-4 h-4 rounded-full inline-flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: stage.color + '22', color: stage.color }}>{i + 1}</span>
            {stage.label[lang]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-4">
          {renderStageCell()}
          <p className="text-center text-xs font-semibold mt-2" style={{ color: currentStage.color }}>{currentStage.label[lang]}</p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">{currentStage.desc[lang]}</p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Zap className="w-3 h-3 mt-0.5 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-gray-600"><strong>{lang === 'en' ? 'Key event:' : 'Evento clave:'}</strong> {currentStage.keyEvent[lang]}</p>
            </div>
            <div className="flex items-start gap-2">
              <Layers className="w-3 h-3 mt-0.5 text-purple-600 flex-shrink-0" />
              <p className="text-xs text-gray-600"><strong>{lang === 'en' ? 'Chromosomes:' : 'Cromosomas:'}</strong> {currentStage.chromosomes[lang]}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveStage(stages[Math.max(0, currentIndex - 1)].id)}
          disabled={currentIndex === 0}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs disabled:opacity-40"
        >
          ← {lang === 'en' ? 'Previous' : 'Anterior'}
        </button>
        <button
          onClick={() => setActiveStage(stages[Math.min(stages.length - 1, currentIndex + 1)].id)}
          disabled={currentIndex === stages.length - 1}
          className="px-3 py-1.5 bg-brand-600 text-white rounded-lg text-xs disabled:opacity-40"
        >
          {lang === 'en' ? 'Next' : 'Siguiente'} →
        </button>
      </div>

      <div className="mt-4 bg-white rounded-lg p-3">
        <p className="text-xs font-semibold text-gray-700 mb-2">{lang === 'en' ? 'Time Spent in Each Phase (typical cell)' : 'Tiempo en Cada Fase (célula típica)'}</p>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={60} dataKey="value" label={({ name, value }) => `${name} (${value}%)`} fontSize={10}>
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// INTERACTIVE: MEIOSIS vs MITOSIS COMPARISON (HL)
// ═══════════════════════════════════════════════════════════════════
function MeiosisMitosisComparison({ lang }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const features = [
    {
      feature: { en: 'Number of divisions', es: 'Número de divisiones' },
      mitosis: { en: '1', es: '1' },
      meiosis: { en: '2', es: '2' },
    },
    {
      feature: { en: 'Daughter cells produced', es: 'Células hijas producidas' },
      mitosis: { en: '2', es: '2' },
      meiosis: { en: '4', es: '4' },
    },
    {
      feature: { en: 'Ploidy of daughter cells', es: 'Ploidía de células hijas' },
      mitosis: { en: 'Diploid (2n)', es: 'Diploide (2n)' },
      meiosis: { en: 'Haploid (n)', es: 'Haploide (n)' },
    },
    {
      feature: { en: 'Genetic variation?', es: '¿Variación genética?' },
      mitosis: { en: 'No — identical to parent', es: 'No — idénticas a la madre' },
      meiosis: { en: 'Yes — crossing over + independent assortment', es: 'Sí — entrecruzamiento + distribución independiente' },
    },
    {
      feature: { en: 'Crossing over?', es: '¿Entrecruzamiento?' },
      mitosis: { en: 'No', es: 'No' },
      meiosis: { en: 'Yes (prophase I)', es: 'Sí (profase I)' },
    },
    {
      feature: { en: 'Homologous pairing?', es: '¿Emparejamiento de homólogos?' },
      mitosis: { en: 'No', es: 'No' },
      meiosis: { en: 'Yes — bivalents form', es: 'Sí — se forman bivalentes' },
    },
    {
      feature: { en: 'Purpose', es: 'Propósito' },
      mitosis: { en: 'Growth, repair, asexual reproduction', es: 'Crecimiento, reparación, reproducción asexual' },
      meiosis: { en: 'Gamete production', es: 'Producción de gametos' },
    },
    {
      feature: { en: 'What separates in division I / only division?', es: '¿Qué se separa en la división I / única división?' },
      mitosis: { en: 'Sister chromatids', es: 'Cromátidas hermanas' },
      meiosis: { en: 'Homologous chromosomes', es: 'Cromosomas homólogos' },
    },
  ];

  const variationSources = [
    {
      source: { en: 'Crossing Over', es: 'Entrecruzamiento' },
      when: { en: 'Prophase I', es: 'Profase I' },
      desc: { en: 'Non-sister chromatids exchange DNA at chiasmata → recombinant chromosomes with new allele combinations.', es: 'Cromátidas no hermanas intercambian ADN en quiasmas → cromosomas recombinantes con nuevas combinaciones de alelos.' },
      icon: '🔀',
    },
    {
      source: { en: 'Independent Assortment', es: 'Distribución Independiente' },
      when: { en: 'Metaphase I', es: 'Metafase I' },
      desc: { en: 'Random orientation of homologous pairs → 2ⁿ possible chromosome combinations (2²³ = 8.4 million in humans).', es: 'Orientación aleatoria de pares homólogos → 2ⁿ posibles combinaciones de cromosomas (2²³ = 8.4 millones en humanos).' },
      icon: '🎲',
    },
    {
      source: { en: 'Random Fertilization', es: 'Fecundación Aleatoria' },
      when: { en: 'At fertilization', es: 'En la fecundación' },
      desc: { en: 'Any sperm can fuse with any egg → multiplies the possible genetic combinations.', es: 'Cualquier espermatozoide puede fusionarse con cualquier óvulo → multiplica las posibles combinaciones genéticas.' },
      icon: '🎯',
    },
  ];

  return (
    <div className="interactive-box">
      <div className="flex items-center gap-2 mb-3">
        <Layers className="w-5 h-5 text-brand-600" />
        <h3 className="font-bold text-gray-800">{t('interactiveMeiosis', lang)}</h3>
        <span className="hl-badge">{t('hlBadge', lang)}</span>
      </div>
      <p className="text-xs text-gray-600 mb-4">
        {lang === 'en'
          ? "Compare mitosis and meiosis side by side. Try to fill in the meiosis column before revealing the answers."
          : "Compara mitosis y meiosis lado a lado. Intenta completar la columna de meiosis antes de revelar las respuestas."}
      </p>

      <div className="bg-white rounded-lg overflow-hidden mb-4">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 text-left font-semibold text-gray-700">{lang === 'en' ? 'Feature' : 'Característica'}</th>
              <th className="px-3 py-2 text-left font-semibold text-brand-700">{lang === 'en' ? 'Mitosis' : 'Mitosis'}</th>
              <th className="px-3 py-2 text-left font-semibold text-red-700">{lang === 'en' ? 'Meiosis' : 'Meiosis'}</th>
            </tr>
          </thead>
          <tbody>
            {features.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2 font-medium text-gray-700">{row.feature[lang]}</td>
                <td className="px-3 py-2 text-gray-600">{row.mitosis[lang]}</td>
                <td className="px-3 py-2">
                  {showAnswers ? (
                    <span className="text-red-700 font-medium">{row.meiosis[lang]}</span>
                  ) : (
                    <input
                      type="text"
                      value={userAnswers[i] || ''}
                      onChange={(e) => setUserAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                      placeholder="..."
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors mb-4"
      >
        {showAnswers
          ? (lang === 'en' ? 'Hide Answers' : 'Ocultar Respuestas')
          : (lang === 'en' ? 'Reveal Meiosis Answers' : 'Revelar Respuestas de Meiosis')}
      </button>

      <div className="bg-white rounded-lg p-4">
        <p className="text-xs font-semibold text-gray-700 mb-3">
          {lang === 'en' ? '3 Sources of Genetic Variation in Meiosis' : '3 Fuentes de Variación Genética en la Meiosis'}
        </p>
        <div className="space-y-3">
          {variationSources.map((src, i) => (
            <div key={i} className="flex items-start gap-3 p-2 rounded-lg bg-red-50 border border-red-100">
              <span className="text-lg">{src.icon}</span>
              <div>
                <p className="text-xs font-semibold text-red-800">{src.source[lang]} <span className="font-normal text-gray-500">({src.when[lang]})</span></p>
                <p className="text-xs text-gray-600">{src.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CHALLENGE QUESTION COMPONENT
// ═══════════════════════════════════════════════════════════════════
function ChallengeQuestion({ qNum, question, modelAnswer, marks, isHL, difficulty, lang, responses, setResponses }) {
  const [revealed, setRevealed] = useState(false);
  const difficultyColors = { easy: 'bg-green-100 text-green-700', medium: 'bg-amber-100 text-amber-700', hard: 'bg-red-100 text-red-700' };
  const difficultyLabels = { easy: lang === 'en' ? 'Easy' : 'Fácil', medium: lang === 'en' ? 'Medium' : 'Medio', hard: lang === 'en' ? 'Hard' : 'Difícil' };

  return (
    <div className={`challenge-card ${isHL ? 'border-l-4 border-red-400' : ''}`}>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-sm font-bold text-gray-800">{t('question', lang)} {qNum}</span>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[difficulty]}`}>{difficultyLabels[difficulty]}</span>
        <span className="text-xs text-gray-500">[{marks} {t('marks', lang)}]</span>
        {isHL && <span className="hl-badge">{t('hlBadge', lang)}</span>}
      </div>
      <p className="text-sm text-gray-800 mb-3 font-medium">{question}</p>
      <textarea
        value={responses[`q${qNum}`] || ''}
        onChange={(e) => setResponses(prev => ({ ...prev, [`q${qNum}`]: e.target.value }))}
        placeholder={t('yourAnswer', lang)}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-brand-400"
      />
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          {t('revealModel', lang)}
        </button>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-green-700 mb-2">{t('modelAnswer', lang)}:</p>
          <p className="text-sm text-green-900 whitespace-pre-wrap">{modelAnswer}</p>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// RELATED APPS COMPONENT
// ═══════════════════════════════════════════════════════════════════
const relatedAppsData = [
  // Nathan will add Vercel links here for related apps
];

function RelatedApps({ lang }) {
  if (relatedAppsData.length === 0) return null;

  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6 border border-brand-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-5 py-4 bg-brand-50 hover:bg-brand-100 transition-colors text-left"
      >
        {open ? <ChevronDown className="w-4 h-4 text-brand-600" /> : <ChevronRight className="w-4 h-4 text-brand-600" />}
        <ExternalLink className="w-4 h-4 text-brand-600" />
        <span className="font-semibold text-brand-800">{t('relatedApps', lang)}</span>
        <span className="text-xs text-gray-500 ml-1">({relatedAppsData.length} apps)</span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-white">
          <p className="text-xs text-gray-500 mb-4">{t('relatedAppsSubtitle', lang)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedAppsData.map((app, i) => {
              const Icon = app.icon;
              return (
                <a
                  key={i}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-brand-400 hover:bg-brand-50 transition-all group"
                >
                  <div className="mt-0.5 p-1.5 rounded-md bg-brand-100 text-brand-600 group-hover:bg-brand-200 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-700 transition-colors flex items-center gap-1">
                      {app.title[lang]}
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-brand-500" />
                    </p>
                    <p className="text-xs text-gray-500">{app.desc[lang]}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CONTENT RENDERER — parses bold markdown in text
// ═══════════════════════════════════════════════════════════════════
function ContentRenderer({ text }) {
  return text.split('\n').map((paragraph, i) => {
    if (!paragraph.trim()) return <br key={i} />;
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="mb-2">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        })}
      </p>
    );
  });
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  const [started, setStarted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [lang, setLang] = useState('en');
  const [level, setLevel] = useState('HL');
  const [activeTab, setActiveTab] = useState('learn');
  const [responses, setResponses] = useState({});
  const [compiled, setCompiled] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const isHL = level === 'HL';

  const handleStart = (name) => {
    setStudentName(name);
    setStarted(true);
  };

  // Compile responses
  const handleCompile = () => {
    const langLabel = lang === 'en' ? 'English' : 'Español';
    let output = `${t('compiledHeader', lang)}\n`;
    output += `${'═'.repeat(50)}\n`;
    output += `${t('studentName', lang)}: ${studentName}\n`;
    output += `${t('level', lang)}: ${level}\n`;
    output += `${t('language', lang)}: ${langLabel}\n`;
    output += `${'═'.repeat(50)}\n\n`;

    const questions = [
      { num: 1, q: t('challengeQ1', lang), a: t('challengeA1', lang), hl: false },
      { num: 2, q: t('challengeQ2', lang), a: t('challengeA2', lang), hl: true },
      { num: 3, q: t('challengeQ3', lang), a: t('challengeA3', lang), hl: true },
      { num: 4, q: t('challengeQ4', lang), a: t('challengeA4', lang), hl: false },
      { num: 5, q: t('challengeQ5', lang), a: t('challengeA5', lang), hl: false },
      { num: 6, q: t('challengeQ6', lang), a: t('challengeA6', lang), hl: false },
    ];

    questions.forEach(({ num, q, a, hl }) => {
      if (hl && !isHL) return;
      output += `${t('question', lang)} ${num}${hl ? ` [${t('hlBadge', lang)}]` : ''}:\n`;
      output += `${q}\n\n`;
      output += `${t('myResponse', lang)}:\n`;
      output += `${responses[`q${num}`] || t('notAnswered', lang)}\n\n`;
      output += `${t('modelAnswer', lang)}:\n`;
      output += `${a}\n\n`;
      output += `${'─'.repeat(40)}\n\n`;
    });

    setCompiled(output);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(compiled);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = compiled;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  if (!started) {
    return <LandingPage onStart={handleStart} lang={lang} setLang={setLang} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── PERSISTENT HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-8 h-8 rounded-full"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <h1 className="text-lg font-bold text-gray-800 leading-tight">{t('appTitle', lang)}</h1>
                <p className="text-xs text-gray-500">{studentName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    lang === 'en' ? 'bg-white shadow text-gray-800' : 'text-gray-500'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('es')}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    lang === 'es' ? 'bg-white shadow text-gray-800' : 'text-gray-500'
                  }`}
                >
                  ES
                </button>
              </div>

              <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
                <button
                  onClick={() => setLevel('SL')}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    level === 'SL' ? 'bg-white shadow text-gray-800' : 'text-gray-500'
                  }`}
                >
                  SL
                </button>
                <button
                  onClick={() => setLevel('HL')}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    level === 'HL' ? 'bg-white shadow text-red-600 font-bold' : 'text-gray-500'
                  }`}
                >
                  HL
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            {[
              { id: 'learn', icon: BookOpen, label: t('learn', lang) },
              { id: 'challenge', icon: Trophy, label: t('challenge', lang) },
              { id: 'compile', icon: ClipboardList, label: t('compileSubmit', lang) },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`nav-tab flex items-center gap-1.5 ${
                  activeTab === id ? 'nav-tab-active' : 'nav-tab-inactive'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* ════════ LEARN SECTION ════════ */}
        {activeTab === 'learn' && (
          <div>
            {/* Related Interactive Apps */}
            <RelatedApps lang={lang} />

            {/* Chunk 1: Cell Division — Mitosis & the Cell Cycle */}
            <div className="learn-chunk">
              <div className="flex items-center gap-2 mb-4">
                <CircleDot className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-bold text-gray-800">{t('chunk1Title', lang)}</h2>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                <ContentRenderer text={t('chunk1Content', lang)} />
              </div>
              <MitosisCycleVisualizer lang={lang} />
              <TextbookReference referenceKey="textbookRef1" lang={lang} />
              <DiveDeeper lang={lang} apps={[
                { name: lang === 'en' ? 'Mitosis Explorer' : 'Explorador de Mitosis', url: 'https://mitosis-explorer.vercel.app', desc: lang === 'en' ? 'Interactive walkthrough of mitosis stages with detailed visuals and animations' : 'Recorrido interactivo de las etapas de la mitosis con visuales detallados y animaciones' },
              ]} />
              <ConceptCheckMCQ
                question={t('chunk1CC1Question', lang)}
                options={t('chunk1CC1Options', lang)}
                correctIndex={t('chunk1CC1Correct', lang)}
                explanation={t('chunk1CC1Explanation', lang)}
                lang={lang}
              />
            </div>

            {/* Chunk 2: Meiosis & Genetic Variation (HL ONLY) */}
            {isHL && (
              <div className="learn-chunk border-l-4 border-red-400">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-5 h-5 text-brand-600" />
                  <h2 className="text-xl font-bold text-gray-800">{t('chunk2Title', lang)}</h2>
                  <span className="hl-badge">{t('hlBadge', lang)}</span>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                  <ContentRenderer text={t('chunk2Content', lang)} />
                </div>
                <MeiosisMitosisComparison lang={lang} />
                <TextbookReference referenceKey="textbookRef2" lang={lang} />
                <ConceptCheckShortAnswer
                  question={t('chunk2CC1Question', lang)}
                  answer={t('chunk2CC1Answer', lang)}
                  lang={lang}
                />
              </div>
            )}

            {/* Chunk 3: Cell Cycle Regulation & Cancer (HL ONLY) */}
            {isHL && (
              <div className="learn-chunk border-l-4 border-red-400">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-brand-600" />
                  <h2 className="text-xl font-bold text-gray-800">{t('chunk3Title', lang)}</h2>
                  <span className="hl-badge">{t('hlBadge', lang)}</span>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                  <ContentRenderer text={t('chunk3Content', lang)} />
                </div>
                <TextbookReference referenceKey="textbookRef3" lang={lang} />
                <DiveDeeper lang={lang} apps={[
                  { name: lang === 'en' ? 'Cell Cycle Interactive Model' : 'Modelo Interactivo del Ciclo Celular', url: 'https://cell-cycle-interactive-model.vercel.app', desc: lang === 'en' ? 'Explore checkpoints, cyclins, CDKs, and how the cell cycle is regulated step by step' : 'Explora los puntos de control, ciclinas, CDKs y cómo se regula el ciclo celular paso a paso' },
                ]} />
                <ConceptCheckMCQ
                  question={t('chunk3CC1Question', lang)}
                  options={t('chunk3CC1Options', lang)}
                  correctIndex={t('chunk3CC1Correct', lang)}
                  explanation={t('chunk3CC1Explanation', lang)}
                  lang={lang}
                />
              </div>
            )}

            {/* Chunk 4: Gene Expression, Regulation & Epigenetics (SL) */}
            <div className="learn-chunk">
              <div className="flex items-center gap-2 mb-4">
                <Atom className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-bold text-gray-800">{t('chunk4Title', lang)}</h2>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                <ContentRenderer text={t('chunk4Content', lang)} />
              </div>
              <TextbookReference referenceKey="textbookRef4" lang={lang} />
              <ConceptCheckMCQ
                question={t('chunk4CC1Question', lang)}
                options={t('chunk4CC1Options', lang)}
                correctIndex={t('chunk4CC1Correct', lang)}
                explanation={t('chunk4CC1Explanation', lang)}
                lang={lang}
              />
            </div>

            {/* Chunk 5: Determining the Rate of Growth (SL) */}
            <div className="learn-chunk">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-bold text-gray-800">{t('chunk5Title', lang)}</h2>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                <ContentRenderer text={t('chunk5Content', lang)} />
              </div>
              <TextbookReference referenceKey="textbookRef5" lang={lang} />
              <ConceptCheckMCQ
                question={t('chunk5CC1Question', lang)}
                options={t('chunk5CC1Options', lang)}
                correctIndex={t('chunk5CC1Correct', lang)}
                explanation={t('chunk5CC1Explanation', lang)}
                lang={lang}
              />
            </div>

            {/* Chunk 6: Water Relations, Osmolarity & Solute Potential (SL) */}
            <div className="learn-chunk">
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-bold text-gray-800">{t('chunk6Title', lang)}</h2>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                <ContentRenderer text={t('chunk6Content', lang)} />
              </div>
              <TextbookReference referenceKey="textbookRef6" lang={lang} />
              <DiveDeeper lang={lang} apps={[
                { name: lang === 'en' ? 'Water Potential & Tonicity' : 'Potencial Hídrico y Tonicidad', url: 'https://water-potential-and-tonicity.vercel.app', desc: lang === 'en' ? 'Interactive simulations of water potential, osmosis, and tonicity in plant and animal cells' : 'Simulaciones interactivas de potencial hídrico, ósmosis y tonicidad en células vegetales y animales' },
              ]} />
              <ConceptCheckShortAnswer
                question={t('chunk6CC1Question', lang)}
                answer={t('chunk6CC1Answer', lang)}
                lang={lang}
              />
            </div>
          </div>
        )}

        {/* ════════ CHALLENGE SECTION ════════ */}
        {activeTab === 'challenge' && (
          <div>
            <div className="mb-6 p-4 bg-brand-50 border border-brand-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-bold text-gray-800">{t('challenge', lang)}</h2>
              </div>
              <p className="text-sm text-gray-600">{t('challengeIntro', lang)}</p>
            </div>

            <ChallengeQuestion qNum={1} question={t('challengeQ1', lang)} modelAnswer={t('challengeA1', lang)} marks={4} isHL={false} difficulty="medium" lang={lang} responses={responses} setResponses={setResponses} />
            {isHL && (
              <ChallengeQuestion qNum={2} question={t('challengeQ2', lang)} modelAnswer={t('challengeA2', lang)} marks={4} isHL={true} difficulty="hard" lang={lang} responses={responses} setResponses={setResponses} />
            )}
            {isHL && (
              <ChallengeQuestion qNum={3} question={t('challengeQ3', lang)} modelAnswer={t('challengeA3', lang)} marks={4} isHL={true} difficulty="hard" lang={lang} responses={responses} setResponses={setResponses} />
            )}
            <ChallengeQuestion qNum={4} question={t('challengeQ4', lang)} modelAnswer={t('challengeA4', lang)} marks={4} isHL={false} difficulty="medium" lang={lang} responses={responses} setResponses={setResponses} />
            <ChallengeQuestion qNum={5} question={t('challengeQ5', lang)} modelAnswer={t('challengeA5', lang)} marks={3} isHL={false} difficulty="medium" lang={lang} responses={responses} setResponses={setResponses} />
            <ChallengeQuestion qNum={6} question={t('challengeQ6', lang)} modelAnswer={t('challengeA6', lang)} marks={4} isHL={false} difficulty="medium" lang={lang} responses={responses} setResponses={setResponses} />
          </div>
        )}

        {/* ════════ COMPILE & SUBMIT SECTION ════════ */}
        {activeTab === 'compile' && (
          <div>
            <div className="mb-6 p-4 bg-brand-50 border border-brand-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardList className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-bold text-gray-800">{t('compileSubmit', lang)}</h2>
              </div>
              <p className="text-sm text-gray-600">{t('compileIntro', lang)}</p>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={handleCompile}
                className="px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition-colors flex items-center gap-2"
              >
                <ClipboardList className="w-5 h-5" />
                {t('compileButton', lang)}
              </button>
              {compiled && (
                <button
                  onClick={handleCopy}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                    copySuccess
                      ? 'bg-green-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {copySuccess ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copySuccess ? t('copied', lang) : t('copyButton', lang)}
                </button>
              )}
            </div>

            {compiled && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                  {compiled}
                </pre>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-6 h-6 rounded-full"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="text-xs text-gray-500">Laughing Coyote Education</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">{t('footerTheme', lang)}</p>
            <p className="text-xs text-gray-400">{t('footerBiozone', lang)}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
