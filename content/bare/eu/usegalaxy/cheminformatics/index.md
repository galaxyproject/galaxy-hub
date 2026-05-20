---
title: Galaxy Cheminformatics
---

<slot name="/bare/eu/usegalaxy/notices" />

# Computational chemistry with Galaxy

<br/>
<img src="/assets/media/usegalaxy/cheminformatics/cheminformatics.png" alt="Cheminformatics" style="float: right; width: min(35vw, 11rem); height: auto; margin: 0 0 1rem 1.5rem;" />

Welcome to the **ChemicalToolbox** -- a webserver for processing, analysing and visualising chemical data, and performing molecular simulations. This server is a flavor of the European Galaxy instance, usegalaxy.eu.

# Content

- [Computational chemistry with Galaxy](#computational-chemistry-with-galaxy)
- [Get started](#get-started)
- [Tools](#tools)
  - [Get data](#get-data)
  - [Chemical structure conversion and manipulation tools](#chemical-structure-conversion-and-manipulation-tools)
  - [Compute chemical properties](#compute-chemical-properties)
  - [Molecular docking](#molecular-docking)
  - [Pharmacophore alignment](#pharmacophore-alignment)
  - [Molecular dynamics simulation](#molecular-dynamics-simulation)
  - [Molecular dynamics analysis](#molecular-dynamics-analysis)
- [Tutorials](#tutorials)
- [Workflows](#workflows)
- [Contributors](#contributors)
- [Citation](#citation)

# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started? Take [a guided tour](https://cheminformatics.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

A good place to start is our [tutorials](#tutorials), which provide an introduction to the cheminformatics and molecular dynamics tools in Galaxy.

You can also check out the standard but customizable [workflows](#workflows) available there.

# Tools

Almost a hundred different tools for cheminformatics and molecular dynamics have been integrated into the ChemicalToolbox. A selection are displayed below.

## Get data

Tool | Description | Reference
--- | --- | ---
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fget_pubchem%2Fctb_pubchem_download_as_smiles" target="_top" title="pubchem">pubchem</a> | Download all compounds from PubChem | [Kim et al., 2016](https://dx.doi.org/10.1093%2Fnar%2Fgkv951)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fchembl%2Fchembl" target="_top" title="chembl">chembl</a> | Download molecules from ChEMBL | [Davies et al, 2015](https://doi.org/10.1093/nar/gkv352)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fget_pdb%2Fget_pdb" target="_top" title="pdb">pdb</a> | Download a file from the Protein Data Bank | [Berman, 2000](http://dx.doi.org/10.1093/nar/28.1.235)


## Chemical structure conversion and manipulation tools

Tool | Description | Reference
--- | --- | ---
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fopenbabel_remsmall%2Fopenbabel_remSmall" target="_top" title="remSmallMol">remSmallMol</a> | Remove small molecules | [N M O'Boyle,2011](https://doi.org/10.1186/1758-2946-3-33)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fopenbabel_addh%2Fopenbabel_addh" target="_top" title="AddH">AddH</a>  | Add hydrogen atoms at a certain pH value | [N M O'Boyle,2011](https://doi.org/10.1186/1758-2946-3-33)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fopenbabel_remduplicates%2Fopenbabel_remDuplicates" target="_top" title="RemDupMol">RemDupMol</a>  | Remove duplicated molecules  | [N M O'Boyle,2011](https://doi.org/10.1186/1758-2946-3-33)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fopenbabel_remove_protonation_state%2Fopenbabel_remove_protonation_state" target="_top" title="remProtState">remProtState</a>  | Remove protonation state of every atom | [N M O'Boyle,2011](https://doi.org/10.1186/1758-2946-3-33)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fopenbabel_compound_convert%2Fopenbabel_compound_convert" target="_top" title="comConvert">comConvert</a>  | Compound Convert Converts various chemistry and molecular modeling data files | [N M O'Boyle,2011](https://doi.org/10.1186/1758-2946-3-33)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fopenbabel_remions%2Fopenbabel_remIons" target="_top" title="remConterIons">remConterIons</a>  | Remove counterions and fragments | [N M O'Boyle,2011](https://doi.org/10.1186/1758-2946-3-33)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fopenbabel_change_title%2Fopenbabel_change_title" target="_top" title="changTitle">changTitle</a>  | Change Title to meta-data value | [N M O'Boyle,2011](https://doi.org/10.1186/1758-2946-3-33)



## Compute chemical properties

Tool | Description | Reference
--- | --- | ---
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fopenbabel_genprop%2Fopenbabel_genProp%2F" target="_top" title="genProp">genProp</a> | Compute physico-chemical properties for a set of molecules  | [N M O'Boyle,2011](https://doi.org/10.1186/1758-2946-3-33)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fnatural_product_likeness%2Fctb_np-likeness-calculator" target="_top" title="NPL">NPL</a> | Natural product likeness calculator  | [Jayaseelan, Kalai Vanii, 2012](http://dx.doi.org/10.1186/1471-2105-13-106)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsilicos_it%2Fctb_silicos_qed" target="_top" title="QED">QED</a> | Drug-likeness quantitative estimation (QED) | [Bickerton et al., 2012](https://doi.org/10.1038/nchem.1243)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fmordred%2Fctb_mordred_descriptors" target="_top" title="mordred">mordred</a> | Molecular descriptor calculator  | [Moriwaki et al., 2018](https://doi.org/10.1186/s13321-018-0258-y)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fchemfp%2Fctb_sdf2fps" target="_top" title="chemfp">chemfp</a> | Fingerprints with chemfp  | [Dalke, 2013](https://doi.org/10.1186/1758-2946-5-s1-p36)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fchemfp%2Fctb_chemfp_butina_clustering" target="_top" title="tbClust">tbClust</a> | Taylor-Butina clustering | [Dalke, 2013](https://doi.org/10.1186/1758-2946-5-s1-p36)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fchemfp%2Fctb_chemfp_nxn_clustering" target="_top" title="nxnClust">nxnClust</a> | NXN clustering | [Dalke, 2013](https://doi.org/10.1186/1758-2946-5-s1-p36)



## Molecular docking

Tool | Description | Reference
--- | --- | ---
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fautodock_vina%2Fdocking" target="_top" title="vina">vina</a> | Docking with AutoDock Vina | [Trott et al., 2009](https://doi.org/10.1002/jcc.21334)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Frdock_rbdock%2Frdock_rbdock" target="_top" title="rbdock">rbdock</a> | Docking with rDock | [Ruiz-Carmona et al., 2014](https://doi.org/10.1371/journal.pcbi.1003571)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsucos_docking_scoring%2Fsucos_docking_scoring" target="_top" title="sucos">sucos</a> | Score docked poses using SuCOS | [Leung et al., 2019](https://doi.org/10.26434/chemrxiv.8100203.v1)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Ffpocket%2Ffpocket" target="_top" title="fpocket">fpocket</a> | Search a protein for potential binding sites | [Schmitdke et al., 2010](https://doi.org/10.1093/nar/gkq383)


## Pharmacophore alignment

Tool | Description | Reference
--- | --- | ---
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Falign_it%2Fctb_alignit" target="_top" title="alignit">alignit</a> | Feature alignment using Align-it | [Taminau et al., 2008](https://doi.org/10.1016/j.jmgm.2008.04.003)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsucos_clustering%2Fsucos_clustering" target="_top" title="sucos_clustering">sucos_clustering</a> | Feature clustering using SuCOS | [Leung et al., 2019](https://doi.org/10.26434/chemrxiv.8100203.v1)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fctb_im_o3dalign%2Fctb_im_o3dalign" target="_top" title="Open3DALIGN">Open3DALIGN</a> | Unsupervised molecular alignment using RDKit | [Tosco et al., 2011](https://doi.org/10.1007/s10822-011-9462-9)



## Molecular dynamics simulation

Tool | Description | Reference
--- | --- | ---
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fgmx_setup%2Fgmx_setup%2F" target="_top" title="gmxSetup">gmxSetup</a> | Produce a topology using GROMACS for a given protein structure  | [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fgmx_solvate%2Fgmx_solvate%2F" target="_top" title="gmxSolvate">gmxSolvate</a> | Solvate a system using GROMACS | [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fgmx_em%2Fgmx_em%2F" target="_top" title="gmxEM">gmxEM</a> | Energy minimization using GROMACS  | [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fgmx_sim%2Fgmx_sim%2F" target="_top" title="gmxSim">gmxSim</a> | MD simulation using GROMACS  | [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fgmx_restraints%2Fgmx_restraints%2F" target="_top" title="gmxRestraints">gmxRestraints</a> | Calculate position restraints using GROMACS  | [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fgmx_makendx%2Fgmx_makendx%2F" target="_top" title="gmxMakeNDX">gmxMakeNDX</a> | Create an index file using GROMACS  | [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fgmx_energy%2Fgmx_energy%2F" target="_top" title="gmxEnergy">gmxEnergy</a> | Extract energy components using GROMACS  | [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fgmx_trj%2Fgmx_trj%2F" target="_top" title="gmxTrj">gmxTrj</a> | Process MD trajectories using GROMACS  | [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fgmx_editconf%2Fgmx_editconf%2F" target="_top" title="gmxEditconf">gmxEditconf</a> | Structure configuration using GROMACS  | [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fgmx_fep%2Fgmx_fep%2F" target="_top" title="gmxFEP">gmxFEP</a> | Alchemical free energy simulations using GROMACS  | [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fambertools_antechamber%2Fambertools_antechamber" target="_top" title="antechamber">antechamber</a> | Process input files with AmberTools  | [Case et al., 2005](https://doi.org/10.1002/jcc.20290)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fambertools_acpype%2Fambertools_acpype" target="_top" title="acpype">acpype</a> | Produce GROMACS topologies with acpype  | [Sousa da Silva et al., 2012](https://doi.org/10.1186/1756-0500-5-367)



## Molecular dynamics analysis

Tool | Description | Reference
--- | --- | ---
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fmdanalysis_distance%2Fmdanalysis_distance%2F" target="_top" title="mdaDistance">mdaDistance</a> | Distance analysis using MDAnalysis  | [Agrawal et al., 2011](https://doi.org/10.1002/jcc.21787)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fmdanalysis_dihedral%2Fmdanalysis_dihedral%2F" target="_top" title="mdaDihedral">mdaDihedral</a> | Dihedral analysis using MDAnalysis  | [Agrawal et al., 2011](https://doi.org/10.1002/jcc.21787)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fmdanalysis_rdf%2Fmdanalysis_rdf%2F" target="_top" title="mdaRDF">mdaRDF</a> | Radial distribution function between two atoms  | [Agrawal et al., 2011](https://doi.org/10.1002/jcc.21787)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fmdanalysis_angle%2Fmdanalysis_angle%2F" target="_top" title="mdaAngle">mdaAngle</a> | Angle analysis using MDAnalysis | [Agrawal et al., 2011](https://doi.org/10.1002/jcc.21787)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fmd_converter%2Fmd_converter%2F" target="_top" title="mdConverter">mdConverter</a> | Interconvert between MD file formats | [McGibbon et al., 2015](https://doi.org/10.1016/j.bpj.2015.08.015) [Abraham et al., 2015](https://doi.org/10.1016/j.softx.2015.06.001)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fpackmol%2Fpackmol%2F" target="_top" title="packmol">packmol</a> | Create initial MD configurations | [Martinez et al., 2009](https://doi.org/10.1002/jcc.21224)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fbio3d_pca%2Fbio3d_pca%2F" target="_top" title="bio3dPCA">bio3dPCA</a> | Apply PCA to an MD trajectory | [Grant et al., 2006](https://doi.org/10.1093/bioinformatics/btl461)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fbio3d_rmsd%2Fbio3d_rmsd%2F" target="_top" title="bio3dRMSD">bio3dRMSD</a> | Calculate RMSD for an MD trajectory | [Grant et al., 2006](https://doi.org/10.1093/bioinformatics/btl461)
<a href="https://cheminformatics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fchemteam%2Fbio3d_rmsf%2Fbio3d_rmsf%2F" target="_top" title="bio3dRMSF">bio3dRMSF</a> | Calculate RMSF for an MD trajectory | [Grant et al., 2006](https://doi.org/10.1093/bioinformatics/btl461)



# Tutorials
- Visit [the Galaxy training website](https://training.galaxyproject.org/training-material/topics/computational-chemistry/) for tutorials on using the Galaxy tools for molecular dynamics.

🙋 Are additional tutorials needed? [Please make a request.](https://github.com/galaxycomputationalchemistry/galaxy-tools-compchem/issues)


# Workflows

To orchestrate tools and help users with their analyses, several workflows are available. They formally orchestrate tools in a defined order and with defined parameters, but they are customizable (tools, order, parameters).

The workflows are available in the [Shared Workflows](https://cheminformatics.usegalaxy.eu/workflows/list_published), with the labels "***cheminformatics***" or "**moleculardynamics**".

Workflow | Description
--- | ---
[Library preparation](https://usegalaxy.eu/u/sbray/w/library-download-final-2) | Preparation of ligand library using PubChem, ChEMBL and ZINC
[Protein-ligand docking](https://cheminformatics.usegalaxy.eu/u/sbray/w/protein-ligand-docking-final) | Docking with AutoDock Vina
[Hole filling](https://cheminformatics.usegalaxy.eu/u/sbray/w/hf080120) | Expanding a library into gaps in the chemical space 
[Cheminformatics-ML](https://cheminformatics.usegalaxy.eu/u/sbray/w/cheminformatics-ml) | Machine learning for predicting small molecule protein interactions
[GROMACS](https://cheminformatics.usegalaxy.eu/u/simonbray/w/molecular-dynamics-1) | Molecular dynamics simulation with GROMACS
[Bio3D](https://cheminformatics.usegalaxy.eu/u/tsenapathi/w/md-analysis-using-bio3d) | Molecular dynamics analysis with Bio3D
[Zauberkugel](https://usegalaxy.eu/u/aurelien_moumbock/w/zauberkugel) | Pharmacophore-based target prediction of a bioactive ligand using Align-it


# Contributors

  * [Simon Bray](https://github.com/simonbray)
  * [Tharindu Senapathi](https://github.com/tsenapathi)
  * [Chris Barnett](https://github.com/chrisbarnettster)
  * [Anup Kumar](https://github.com/anuprulez)
  * [Aurélien F. A. Moumbock](https://github.com/aurelienmoumbock)
  * Xavier Lucas
  * [Björn Grüning](https://github.com/bgruening)

# Citation

  * Simon Bray, Xavier Lucas, Anup Kumar and Björn Grüning. **"The ChemicalToolbox: reproducible, user-friendly cheminformatics analysis on the Galaxy platform"**, Journal of Cheminformatics, doi: [10.1186/s13321-020-00442-7](https://doi.org/10.1186/s13321-020-00442-7)
  * Tharindu Senapathi, Simon Bray, Christopher B Barnett, Björn Grüning, Kevin J Naidoo.
**"Biomolecular Reaction and Interaction Dynamics Global Environment (BRIDGE)"**, Bioinformatics, Volume 35, Issue 18, 15 September 2019, Pages 3508–3509, doi: [10.1093/bioinformatics/btz107](https://doi.org/10.1093/bioinformatics/btz107)

<slot name="/eu/common/data-policy" />

<slot name="/bare/eu/usegalaxy/jobs" />
