# CHANGELOG

## [2.0.0] 2121-03-18

The first release of D&D5e Extender under this fork.

### CHANGED

- Quarantine data related to custom ability scores and skills in flags, so that they don't pollute the base dnd5e data.
  This mitigates *some*, but not *all*, of the risks inherent in disabling this module.
  
### FIXED

- Use world scope settings, rather than client scope settings for custom ability scores and skills so that all users get the same ones.
