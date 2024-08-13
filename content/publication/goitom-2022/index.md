---
title: Efficient numerical methods for the optimisation of large kinetic reaction
  mechanisms
authors:
- Simret Kidane Goitom
- Máté Papp
- Márton Kovács
- Tibor Nagy
- István Gy. Zsély
- Tamás Turányi
- László Pál
date: '2022-08-01'
publishDate: '2024-08-13T10:49:12.365934Z'
publication_types:
- article-journal
publication: '*Combustion Theory and Modelling*'
doi: 10.1080/13647830.2022.2110945
abstract: 'Optimisation of detailed combustion mechanisms means that the corresponding
  kinetic model is fitted to experimental data via optimising their important rate
  and thermodynamic parameters within their domain of uncertainty. Typically, several
  dozen parameters are fitted to several hundred to several thousand data points.
  Many numerical optimisation methods have been used, but the efficiency of these
  methods has not been compared systematically. In this work, parameters of an H2/O2/NOx
  mechanism (214 reaction steps of 35 species) were fitted to 1552 indirect (ignition
  delay times measured in shock tubes and concentrations measured in flow reactors)
  and 755 direct measurements. Three test cases were investigated: (1) fitting the
  Arrhenius parameters of 2 reaction steps to 732 data points; (2) fitting the Arrhenius
  parameters of 4 reaction steps to 1077 data points; (3) fitting the Arrhenius parameters
  of 10 reaction steps to 2307 data points. All 3 cases were investigated in 2 ways:
  fitting the A-parameters only and fitting all Arrhenius parameters (5, 11 and 29
  parameters, respectively). A series of global (FOCTOPUS, genetic algorithm, simulated
  annealing, particle swarm optimisation, covariance matrix adaptation evolutionary
  strategy (CMA-ES)) and local (simplex, pattern search, interior-point, quasi-Newton,
  BOBYQA, NEWUOA) optimisation methods were tested on these cases, some of them in
  two variants. The methods were compared in terms of the final error function value
  and number of error function evaluations. The main conclusions are that the FOCTOPUS
  resulted in the lowest final error value in all cases, but this method required
  relatively many error function evaluations. As the task became more difficult, more
  and more methods failed. A variant of the BOBYQA method looked stable and efficient
  in all cases.'
tags:
- combustion mechanism development
- comparison of optimisation methods
- optimisation of Arrhenius parameters
---
